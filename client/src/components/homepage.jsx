import React from 'react';
import { Link } from 'react-router-dom';

import revistaLogo from './styles/revista-logo.png'
import '../App.css'

const HomePage = () => {
    let authToken = document.cookie.split('=')[1];
    if (authToken !== undefined) {
        return (
            <div className="homepage">
                <h3>Welcome to Revista</h3>
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

export default HomePage;