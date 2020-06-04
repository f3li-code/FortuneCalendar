import React from 'react';

import classes from './BusInfo.module.css';

const BusInfo = props => {
    const infoClasses = [classes.BusInfo, classes[props.infoType]];
    if (props.status === 'unfilled') {
        infoClasses.push(classes.Unfilled);
    }
    return (
        <p className={infoClasses.join(' ')} onClick={props.clicked}>{props.children}</p>
    )
}

export default BusInfo;