import React from 'react';
import { Link } from 'react-router-dom';

import revistaLogo from './styles/revista-logo.png'
import '../App.css'

const HomePage = () => {
    return (
        <div className="homepage">
            <img src={revistaLogo} alt="revista-logo"></img>
            <div className="App-subtitle">A simple journal application</div>
            <Link to="/login" style={{marginRight: 15}} className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-light">Sign Up</Link>
        </div>
    );
}

export default HomePage;