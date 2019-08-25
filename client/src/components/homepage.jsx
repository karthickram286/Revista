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

    logoutPrompt = () => {
        sessionStorage.removeItem('clickToContinue');
        sessionStorage.setItem('isLogout', true);
        window.location.reload();
    }

    noLogout = () => {
        sessionStorage.setItem('clickToContinue', 'true');
        sessionStorage.removeItem('isLogout');
        window.location.reload();
    }

    yesLogout = () => {
        sessionStorage.removeItem('isLogout');
        localStorage.removeItem('userId');
        this.removeAuthToken();
    }

    render() {
        if (this.state.authToken !== undefined) {
            if (sessionStorage.getItem('clickToContinue') === 'true') {
                return (
                    <div className="homepage">
                        <h3>Welcome to Revista</h3><br/>
                        <Link to="/notes" className="btn btn-primary">Notes</Link>
                        <Button style={{marginLeft: 15}} className="btn btn-danger" onClick={ this.logoutPrompt }>Logout</Button>
                    </div>
                );
            } else if (sessionStorage.getItem('isLogout') === 'true') {
                return (
                    <div className="homepage">
                        <h3>Are you sure you want to Logout?</h3><br/>
                        <Button style={{marginRight: 15}} className="btn btn-danger" onClick={ this.yesLogout }>Yes</Button>
                        <Button style={{marginRight: 15}} className="btn btn-primary" onClick={ this.noLogout }>No</Button>
                    </div>
                );
            }
            else {
                return (
                    <div className="homepage">
                        <h3>Welcome to Revista</h3><br/>
                        <Button className="btn btn-success" onClick={ this.reloadPage }>Click to continue</Button>
                    </div>
                );
            }
        } else {
            localStorage.removeItem('userId');
            sessionStorage.removeItem('clickToContinue');
            return (
                <div className="homepage">
                    <img src={revistaLogo} alt="revista-logo"></img>
                    <div className="App-subtitle">A simple journal application</div>
                    <Link to="/login" style={{marginRight: 15}} className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-success">Sign Up</Link>
                </div>
            );
        }
    }
}
 
export default HomePage;