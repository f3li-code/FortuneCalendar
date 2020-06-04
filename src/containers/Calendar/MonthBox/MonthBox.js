import React from 'react';

import classes from './MonthBox.module.css';

const MonthBoxes = props => {
    const boxClasses = [classes.MonthBox];
    if (props.isCurrMonth) boxClasses.push(classes.CurrMonth);
    return (
        <div className={boxClasses.join(' ')} onClick={props.clicked}>
            <h2>{props.month}</h2>
        </div>
    )
}

export default MonthBoxes;