import React from 'react';
import { Link } from 'react-router-dom';

import revistaLogo from './styles/revista-logo.png'
import '../App.css'
import { Button } from 'react-bootstrap';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            domain: window.location.hostname,
            authToken: document.cookie.split('=')[1]
        }
    }

    removeAuthToken() {
        var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "authToken=" + this.state.authToken + ";" + expires + ";path=/";
        this.forceUpdate();
    }

    render() {
        if (this.state.authToken !== undefined) {
            return (
                <div className="homepage">
                    <h3>Welcome to Revista</h3><br/>
                    <Button onClick={ this.removeAuthToken }>new Logout</Button>
                    <Link to="/logout" style={{marginRight: 15}} className="btn btn-primary">Logout</Link>
                    <Link to="/notes" className="btn btn-light">Notes</Link>
                </div>
            );
        } else {
            return (
                <div className="homepage">
                    <img src={revistaLogo} alt="revista-logo"></img>
                    <div className="App-subtitle">A simple journal application</div>
                    <Link to="/login" style={{marginRight: 15}} className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-light">Sign Up</Link>
                </div>
            );
        }
    }
}
 
export default HomePage;