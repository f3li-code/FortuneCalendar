import React from 'react';

import classes from './Modal.module.css';

const Modal = props => {
    const modalClasses = [classes.Modal];
    if (!props.show) {
        modalClasses.push(classes.Hide);
    } else {
        // console.log('show modal');
    }
    return (
        <div className={modalClasses.join(' ')}>
            {props.children}
        </div>
    )
}

export default Modal;