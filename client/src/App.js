import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar';
import Footer from './components/footer';
import HomePage from './components/homepage';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';
import Notes from './components/notes';
import NoteEdit from './components/note-edit';


function App() {
  let authToken = document.cookie.split('=')[1];
  if (authToken !== undefined) {
    return (
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/" component= { HomePage } />
            <Route exact path="/home" component= { HomePage } />
            <Route exact path="/notes" component= { Notes } />
            <Route exact path="/noteEdit/:noteId" component = { NoteEdit } />
          </Switch>
        <Footer content="© 2019 Copyright: Revista.com" />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/" component= { HomePage } />
            <Route exact path="/login" component= { LoginPage } />
            <Route exact path="/register" component= { RegisterPage } />
          </Switch>
        <Footer content="© 2019 Copyright: Revista.com" />
      </div>
    );
  }
}

export default App;
