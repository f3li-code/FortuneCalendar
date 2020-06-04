import React from 'react';

import classes from './Input.module.css';

const Input = props => {
    let input = null;
    switch (props.inputType) {
        case 'input' : 
            input = (
                <input type={props.type} 
                        className={classes.Input}
                        name={props.name} 
                        placeholder={props.placeholder}
                        onChange={props.changed}
                        value={props.value}/>
            )
            break;
        case 'textarea' :   // FIX ME LATER
            input = (
                <textarea onChange={props.changed} value={props.value} style={{width: '100%', height: '50px'}}>
                    
                </textarea>
            )
            break;
        default: 
            console.log('[Input.js] error: no matching input type');
    }
    return (
        <div>
            {input}
        </div>
    )
}

export default Input;