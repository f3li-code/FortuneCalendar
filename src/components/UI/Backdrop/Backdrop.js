import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = props => {
    const BackdropClasses = [classes.Backdrop];
    if (!props.show) BackdropClasses.push(classes.Hide);
    return (
        <div className={BackdropClasses.join(' ')} onClick={props.close}></div>
    )
}

export default Backdrop;