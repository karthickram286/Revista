import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/login-page.css';

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
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