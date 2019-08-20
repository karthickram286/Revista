import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/login-page.css';

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            domain: window.location.hostname,
            email: "",
            password: "",
            status: "",
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value,
          status: ''
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        fetch('https://' + this.state.domain + '/api/user/signInUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
            .then(signInUser => {
                if (signInUser.authToken !== undefined) {
                    this.setState({ status: 'Successfully signed in...' })
                } else {
                    this.setState({ status: signInUser.error})
                }
            })
    }
    
    render() {
        return(
            <div className="loginpage">
                <form onSubmit= { this.handleSubmit }>
                    <FormGroup controlId="email">
                        <FormLabel color="blue">Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={ this.state.email }
                            onChange={ this.handleChange }
                        />
                    </FormGroup>

                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            value={ this.state.password }
                            onChange= { this.handleChange }
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>{ this.state.status }</FormLabel>
                    </FormGroup>

                    <Button
                        block
                        disabled={ !this.validateForm() }
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default LoginPage;