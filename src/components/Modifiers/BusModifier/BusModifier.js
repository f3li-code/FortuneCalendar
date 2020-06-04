import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './BusModifier.module.css';

class BusModifier extends Component {
    // console.log('BusModifier props:', props)
    state = {
           confirmDelete: false
    }
    toggleConfirmDeleteHandler = () => {
           const prevConfirmDeleteState = this.state.confirmDelete;
           this.setState({
                  confirmDelete: !prevConfirmDeleteState
           })
    }

    render() {
           let confirmDeleteControls = null;
           let regularControls = (
                     <div className={classes.RegControls}>
                            <Button clicked={this.props.submitted}
                            btnType='Confirm'>Confirm</Button>
                            <Button clicked={this.props.close}
                            btnType='Edit'>Cancel</Button>
                            <Button clicked={this.toggleConfirmDeleteHandler}
                            btnType='Cancel'>Clear</Button>
                     </div>
              )
           if (this.state.confirmDelete){
                  regularControls = null;
                  confirmDeleteControls = (
                     <div className={classes.ClearControls}>
                            <h3>Confirm Clear?</h3>
                            <Button clicked={this.props.clearData}
                            btnType='Cancel'>Clear</Button>
                            <Button clicked={this.toggleConfirmDeleteHandler}
                            btnType='Edit'>Cancel</Button>
                     </div>
                  )
           }
        return (
              <div>
                     <div className={classes.Title}>
                            <h1 style={{margin: 0}}>{this.props.month} {this.props.date}, {this.props.day}</h1>
                            <h1 style={{margin: 0}}>BUS {this.props.busNum}</h1>
                     </div>
                     <div className={classes.InputBlock}>
                            <div className={classes.Input}>
                                   <label>Driver</label>
                                   <Input inputType='input' 
                                          placeholder='Driver'
                                          type='text' 
                                          name='driver' 
                                          value={this.props.bus.driver}
                                          changed={this.props.changeDriver}/>
                                          
                            </div>
                            <div className={classes.Input}>
                                   <label>Customer</label>
                                   <Input inputType='input' 
                                          placeholder='Customer'
                                          type='text' 
                                          name='customer' 
                                          value={this.props.bus.customer} 
                                          changed={this.props.changeCustomer}/>
                            </div>
                            <div className={classes.Input}>
                                   <label>From</label>
                                   <Input inputType='input' 
                                          placeholder='From'
                                          type='text' 
                                          name='from' 
                                          value={this.props.bus.route.from} 
                                          changed={this.props.changeFrom}/>
                            </div>
                            <div className={classes.Input}>
                                   <label>To</label>
                                   <Input inputType='input'
                                          placeholder='To' 
                                          type='text' 
                                          name='to' 
                                          value={this.props.bus.route.to} 
                                          changed={this.props.changeTo}/>   
                            </div>
                            <div className={classes.Input}>
                                   <label>Type</label>
                                   <Input inputType='input' 
                                          placeholder='Type'
                                          type='text' 
                                          name='type' 
                                          value={this.props.bus.type} 
                                          changed={this.props.changeType}/>
                            </div>
                     </div>
                     
                     {confirmDeleteControls}
                     {regularControls}

              </div>
       )   
    }
}

export default BusModifier;