import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './styles/register-page.css';

class RegisterPage extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmpassword: ""
        };
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmpassword.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json',);
        headers.append('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUyMGVlNDQ4NzlhMTY2ODQwNzQwMTYiLCJpYXQiOjE1NjU2NTg4NTJ9.19F1AGzV1IxFgBUOh6k8lcWRG95gYV56gtRgVJCkFpc');
        fetch('http://localhost:4000/api/user/addUser', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: headers
        });
    }
    
    render() {
        return(
            <div className="loginpage">
                <form onSubmit= { this.handleSubmit }>
                    <FormGroup controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={ this.state.name }
                            onChange={ this.handleChange }
                        />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
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

                    <FormGroup controlId="confirmpassword">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type="password"
                            value={ this.state.confirmpassword }
                            onChange= { this.handleChange }
                        />
                    </FormGroup>

                    <Button
                        block
                        disabled={ !this.validateForm() }
                        type="submit"
                    >
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default RegisterPage;