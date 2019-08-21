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

    removeAuthToken = () => {
        var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "authToken=" + this.state.authToken + ";" + expires + ";path=/";
        sessionStorage.removeItem('clickToContinue');
        window.location.reload();
    }

    reloadPage = () => {
        sessionStorage.setItem('clickToContinue', 'true');
        window.location.reload();
    }

    render() {
        if (this.state.authToken !== undefined) {
            console.log(sessionStorage.getItem('clickToContinue'));
            if (sessionStorage.getItem('clickToContinue') === 'true') {
                return (
                    <div className="homepage">
                        <h3>Welcome to Revista</h3><br/>
                        <Button style={{marginRight: 15}} className="btn btn-primary" onClick={ this.removeAuthToken }>Logout</Button>
                        <Link to="/notes" className="btn btn-light">Notes</Link>
                    </div>
                );
            } else {
                return (
                    <div className="homepage">
                        <h3>Welcome to Revista</h3><br/>
                        <Button className="btn btn-success" onClick={ this.reloadPage }>Click to continue</Button>
                    </div>
                );
            }
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