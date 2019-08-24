import React from 'react';
import { Button, FormGroup, FormControl, FormLabel, ListGroup, Badge } from 'react-bootstrap';
import './styles/register-page.css';

class RegisterPage extends React.Component {
    constructor() {
        super();

        this.state = {
            domain: window.location.hostname,
            name: "",
            nameStatus: "",
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
          [event.target.id]: event.target.value,
          nameStatus: ''
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.password !== this.state.confirmpassword) {
            this.setState({ nameStatus: `Passwords didn't match`});
            return;
        }

        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/user/addUser';
        } else {
            url = 'https://' + this.state.domain + '/api/user/addUser';
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }).then(response => response.json())
            .then(addUser => {
                if (addUser.error !== undefined) {
                    this.setState({ nameStatus: addUser.error});
                } else {
                    this.setState({ nameStatus: 'User added successfully'});
                }
            });
    }
    
    render() {
        return(
            <div className="registerpage">
                <div className="registeralert">
                <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        Password must
                    </ListGroup.Item>
                    <ListGroup.Item as="li" disabled>
                        Have atleast one capital letter
                    </ListGroup.Item>
                    <ListGroup.Item as="li" disabled>
                    Have atleast one number
                    </ListGroup.Item>
                    <ListGroup.Item as="li" disabled>
                        Be atleast 6 characters
                    </ListGroup.Item>
                </ListGroup>
                </div>
                <br /><br />
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

                    <Badge pill variant="info">{ this.state.nameStatus }</Badge>
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