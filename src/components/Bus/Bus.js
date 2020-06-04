import React from 'react';

import BusInfo from './BusInfo/BusInfo';
// import Button from '../UI/Button/Button';

import classes from './Bus.module.css';

const removeSpaces = origStr => {
    return origStr.replace(/\s/g, '');
}
const Bus = props => {
    // 1. if the information is yet to be filled, the background color should be salmon
    // 2. clicking on the bus number should result in a showing of a modal, 
    //    on which user can change the information of that bus on that day
    let driver, customer, route, type;
    if (props.driver && removeSpaces(props.driver).length > 0) {
        driver = <BusInfo infoType='Driver' status='filled'><strong>{props.driver}</strong></BusInfo>
    } else {
        driver = <BusInfo infoType='Driver' status='unfilled'>DRIVER</BusInfo>
    }
    if (props.customer && removeSpaces(props.customer).length > 0) {
        customer = <BusInfo infoType='Customer' status='filled'><strong>{props.customer}</strong></BusInfo>
    } else {
        customer = <BusInfo infoType='Customer' status='unfilled'>CUSTOMER</BusInfo>
    }
    if (props.route.from && removeSpaces(props.route.from).length > 0 && props.route.to && removeSpaces(props.route.to).length > 0) {
        route = <BusInfo infoType='Route' status='filled'><strong>{props.route.from} - {props.route.to}</strong></BusInfo>
    } else {
        route = <BusInfo infoType='Route' status='unfilled'>FROM - TO</BusInfo>
    }
    if (props.type && removeSpaces(props.type).length > 0) {
        type = <BusInfo infoType='Type' status='filled'><strong>{props.type}</strong></BusInfo>
    } else {
        type = <BusInfo infoType='Type' status='unfilled'>TYPE</BusInfo>
    }

    return (
        <div className={classes.Bus}>
            <BusInfo infoType='BusNum' clicked={props.edit}>{props.busNumber}</BusInfo>
            {driver}
            {customer}
            {route}
            {type}
        </div>
    )
}

export default Bus;