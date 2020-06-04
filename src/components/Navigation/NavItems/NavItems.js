import React from 'react';

import NavItem from './NavItem/NavItem';

import classes from './NavItems.module.css';

const NavItems = props => {
    return (
        <div className={classes.NavItems}> 
            <NavItem link='/calendar'>Calendar</NavItem>
            <NavItem link='/'>Home</NavItem>      
        </div>

    )
}

export default NavItems;