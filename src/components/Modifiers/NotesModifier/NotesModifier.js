import React from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import classes from './NotesModifier.module.css';

const NotesModifier = props => {
    return (
        <div>
            <div className={classes.Title}>
            <h1 style={{margin: 0}}>{props.month} {props.date}, {props.day}</h1>
            <h1 style={{margin: 0}}>Notes</h1>
            </div>
            <div className={classes.InputBlock}>
                <div className={classes.Input}>
                    <Input inputType='textarea'
                            value={props.notes}
                            changed={props.updateNotes}
                            placeHolder='Notes'/>
                </div>
            </div>
            <div className={classes.Controls}>
                <Button btnType='Confirm' clicked={props.submitChange}>Confirm</Button>
                <Button btnType='Cancel' clicked={props.closeModal}>Cancel</Button>
            </div>
        </div>
        
    )
}

export default NotesModifier;