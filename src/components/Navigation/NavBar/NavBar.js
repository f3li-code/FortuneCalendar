import React from 'react';

import NavItems from '../NavItems/NavItems';

import classes from './NavBar.module.css';

const NavBar = props => {
    return (
        <div className={classes.NavBar}>
            <NavItems />
        </div>
    )
}

export default NavBar;