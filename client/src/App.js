import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './components/homepage';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';


function App() {
  return (
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/" component= { HomePage } />
            <Route exact path="/home" component= { HomePage } />
            <Route exact path="/login" component= { LoginPage } />
            <Route exact path="/register" component= { RegisterPage } />
          </Switch>
        <Footer content="copyright @copy 2018 Revista.inc" />
      </div>
  );
}

export default App;
