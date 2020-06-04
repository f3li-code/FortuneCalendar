import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

import MonthBox from './MonthBox/MonthBox';
// import Day from '../Day/Day';
// import Month from '../Month/Month';


class Calendar extends Component {
    state = {
        months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        currMonth: ''
    }

    componentDidMount() {
        console.log('[Calendar.js] componentDidMount', this.props)
        const today = new Date();
        this.setState({
            currMonth: today.toDateString().substring(4, 7).toUpperCase()
        }, () => {console.log(this.state.currMonth)})
    }

    monthClickedHandler = (ind) => {
        console.log('[Calendar.js]', ind);
        this.props.history.push('/calendar/2020/' + this.state.months[ind]);
    }

    render() {
        const monthBoxes = this.state.months.map((month, ind) => {
            return <MonthBox month={month}
                             key={ind}
                             clicked={() => this.monthClickedHandler(ind)} 
                             isCurrMonth={(month === this.state.currMonth)}/>
        })
        return (
            <div>
                {monthBoxes}
            </div>
        )
        
    }
}

export default Calendar;