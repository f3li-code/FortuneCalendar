import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// import daysInMonth from '../../constants/daysInMonth';

import Bus from '../../../../components/Bus/Bus';
// import BusInfo from '../../components/Bus/BusInfo/BusInfo';
import Modal from '../../../../components/UI/Modal/Modal';
import BusModifier from '../../../../components/Modifiers/BusModifier/BusModifier';
import NotesModifier from '../../../../components/Modifiers/NotesModifier/NotesModifier';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Button from '../../../../components/UI/Button/Button';

import axios2020 from '../../../../axios-calendar2020';
import * as daysInMonth from '../../../../constants/daysInMonth';

import classes from './Day.module.css';

class Day extends Component {
    state = {
        showBusModal: false,
        showNotesModal: false,
        showModalBackdrop: false,
        newBusInfo: {},     // busInfo container that patches new data
        newNotes: '',
        currBusNum: -1
    }

    componentDidMount() {

    }

    openBusModalHandler = (busNum) => {
        const currShowBusModal = !this.state.showBusModal;
        const currShowBackdrop = !this.state.showModalBackdrop;
        const currRoute = {
            ...this.props.buses[busNum].route
        }
        const currBusInfo = {
            ...this.props.buses[busNum],
            route: currRoute
        }
        this.setState({
            showBusModal: currShowBusModal,
            showModalBackdrop: currShowBackdrop,
            newBusInfo: currBusInfo,
            currBusNum: busNum
        })
    }

    openNotesModalHandler = (prevNotes) => {
        // console.log('openNotesModalHandler')
        this.setState({
            newNotes: prevNotes,
            showNotesModal: true,
            showModalBackdrop: true
        })
    }

    closeBackdropModalHandler = () => {
        this.setState({
            showBusModal: false,
            showNotesModal: false,
            showModalBackdrop: false
        })
    }

    changeDataHandler = (event, field) => {
        // console.log('changeDataHandler', event.target.value);
        const newInput = event.target.value;
        this.setState(prevState => {
            return {
                newBusInfo: {
                    ...prevState.newBusInfo,
                    route: {
                        ...prevState.newBusInfo.route
                    },
                    [field]: newInput
                }
            }
        })
    }
    changeRouteHandler = (event, field) => {
        // console.log('changeRouteHandler')
        const newInput = event.target.value;
        this.setState(prevState => {
            return {
                newBusInfo: {
                    ...prevState.newBusInfo,
                    route: {
                        ...prevState.newBusInfo.route,
                        [field]: newInput
                    }
                }
            }
        })
    }

    submitNewBusData = (year, month, date, busNumber) => {
        // console.log('information for', year,month,date,'bus',busNumber,this.state.newBusInfo);
        const URL = daysInMonth.monthKeys[month]+'/'+date+'/busInfo/'+busNumber+'/.json';
        const data = this.state.newBusInfo;

        
        if (Number(year) === 2020) {
            // console.log('submitNewBusData ready to patch')
            axios2020.patch(URL, data)
                .then(res => {
                    console.log(res.data)
                    this.closeBackdropModalHandler();
                    this.reloadPage();
                })
                .catch(error => {
                    console.log('[Day.js] error in submitting data', error);
                    console.log(URL, data)
                })
        }
    }

    clearBusDataHandler = (year, month, date, busNumber) => {
        this.setState({
            newBusInfo: {
                driver: '',
                customer: '',
                route: {
                    from: '',
                    to: ''
                },
                type: ''
            }
        }, () => this.submitNewBusData(year, month, date, busNumber));
    }

    submitNewNotes = (year, month, date) => {
        // console.log('submitNewNotes to: /' + daysInMonth.monthKeys[month] + '/' + date + '/.json');
        const patchNotes = {notes: this.state.newNotes}
        let URL = daysInMonth.monthKeys[month] + '/' + date + '/.json'
        if (Number(year) === 2020) {
            axios2020.patch(URL, patchNotes)
                .then(res => {
                    console.log(res.data)
                    this.closeBackdropModalHandler();
                    this.reloadPage();
                })
                .catch(error => {
                    console.log('error in submitNewNotes', error);
                })
        }
    }

    updateNotesHandler = (event) => {
        // console.log(event.target.value);
        const newNotes = event.target.value
        this.setState({
            newNotes: newNotes
        })
    }

    reloadPage = () => {
        window.location.reload()
    }

    render() {
        const busKeys = Object.keys(this.props.buses)
        const buses = busKeys.map((busNum, ind) => {
            if (!this.props.buses[busNum]) return null;
            return <Bus key={ind}
                    busNumber={busNum}
                    driver={this.props.buses[busNum].driver}
                    customer={this.props.buses[busNum].customer}
                    route={this.props.buses[busNum].route}
                    type={this.props.buses[busNum].type}
                    edit={() => this.openBusModalHandler(busNum)}/>    
        })
        const dayClasses = [classes.Day];
        if (!this.props.inCurrMonth) {
            dayClasses.push(classes.NotInCurrMonth);
        }
        let busModifier = null;
        if (this.state.showBusModal) {
            busModifier = (
                <BusModifier bus={this.state.newBusInfo}
                             busNum={this.state.currBusNum}
                             month={this.props.month}
                             day={this.props.day}
                             date={this.props.date}
                             changeDriver={(event) => this.changeDataHandler(event, 'driver')}
                             changeCustomer={(event) => this.changeDataHandler(event, 'customer')}
                             changeFrom={(event) => this.changeRouteHandler(event, 'from')}
                             changeTo={(event) => this.changeRouteHandler(event, 'to')}
                             changeType={(event) => this.changeDataHandler(event, 'type')}
                             close={this.closeBackdropModalHandler}
                             submitted={() => this.submitNewBusData(this.props.year, this.props.month, this.props.date, this.state.currBusNum)}
                             clearData={() => this.clearBusDataHandler(this.props.year, this.props.month, this.props.date, this.state.currBusNum)}/>
            )
        }
        let notesModifier = null;
        if (this.state.showNotesModal) {
            notesModifier = (
                <NotesModifier notes={this.state.newNotes} updateNotes={this.updateNotesHandler}
                                month={this.props.month} date={this.props.date} day={this.props.day}
                                closeModal={this.closeBackdropModalHandler} submitChange={() => this.submitNewNotes(this.props.year, this.props.month, this.props.date)}/>
            )
        }
        return (
            <div className={dayClasses.join(' ')}>
                <Backdrop show={this.state.showModalBackdrop}
                            close={this.closeBackdropModalHandler}/>
                <Modal show={this.state.showBusModal}>
                    {busModifier}
                </Modal>
                <div>
                </div>
                <h3>{this.props.day} - {this.props.date}</h3>
                {buses}
                <br />
                <Modal show={this.state.showNotesModal}>
                    {notesModifier}
                </Modal>
                <p style={{fontWeight: 'bold'}}>Notes: {this.props.notes 
                                    ? <Button btnType='Edit' clicked={() => this.openNotesModalHandler(this.props.notes)}>edit</Button> 
                                    : <Button btnType='Edit' clicked={() => this.openNotesModalHandler('')}>add</Button>}</p>
                <p style={{height: '50px', overflow: 'scroll'}}>{this.props.notes}</p>
            </div>
        )
    }
}

export default Day;