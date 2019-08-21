import React from 'react';
import { Component } from 'react';
import NavIcon from './navicon';

import './styles/navbar.styles.css';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            isUsedSignedIn: document.cookie.split('=')[1]
        };
    }

    render() {
        if (this.state.isUsedSignedIn !== undefined) {
            return (
                <div className="topnav">
                    <NavIcon name="Home" status="active" />
                    <NavIcon name="Notes" status="" />
                </div>
           );
        } else {
            return (
                <div className="topnav">
                    <NavIcon name="Home" status="active" />
                    <NavIcon name="Login" status="" />
                    <NavIcon name="Register" status="" />
                    <NavIcon name="Notes" status="" />
                </div>
           );
        }
    }
}

export default Navbar;