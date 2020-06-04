import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

const NavItem = props => {
    return (
        <NavLink className={classes.NavItem} to={props.link}>{props.children}</NavLink>
    )
}

export default NavItem;