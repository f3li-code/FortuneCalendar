import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom'; 

// import NavItems from '../../components/Navigation/NavItems/NavItems';
import NavBar from '../../components/Navigation/NavBar/NavBar';

// import Month from '../../containers/Month/Month';
// import Calendar from '../../containers/Calendar/Calendar'

// import * as daysInMonth from '../../constants/daysInMonth';

class Layout extends Component {
    state = {
        months: []
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                {/* <NavLink to='/calendar'>Calendar</NavLink> */}
                <NavBar />
                {/* <NavItems /> */}
                {this.props.children}
            </div>
        )
    }
}

export default Layout;