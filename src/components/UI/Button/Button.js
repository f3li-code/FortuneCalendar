import React from 'react';

import classes from './Button.module.css';

const Button = props => {
    const buttonClasses = [classes.Button, classes[props.btnType]];
    return (
        <button className={buttonClasses.join(' ')} onClick={props.clicked}>{props.children}</button>
    )
}

export default Button;