import React from 'react';
import { Component } from 'react';
import NavIcon from './navicon';

import './styles/navbar.styles.css';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return (
             <div className="topnav">
                 <NavIcon name="Home" status="active" />
                 <NavIcon name="Login" status="" />
                 <NavIcon name="Register" status="" />
             </div>
        );
    }
}

export default Navbar;