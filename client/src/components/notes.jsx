import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/notes.css';

class Notes extends React.Component {
    constructor() {
        super();

        this.state = {
            isUsedSigned: document.cookie.authToken,
            noteTitle: '',
            noteBody: '',
            status: ''
        }
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value,
          status: ''
        });
    }

    validateForm() {
        return this.state.noteTitle.length > 0 && this.state.noteBody.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value,
          status: ''
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.isUsedSigned !== undefined) {
            console.log('User Signed in ' + this.state.noteTitle);
            this.setState({ status: 'Note added'});
        } else {
            console.log('User not signed in');
            this.setState({ status : 'Log in to add note'});
        }
    }

    render() {
        return(
            <div className="notes-page">
                <form onSubmit= { this.handleSubmit }>
                    <FormGroup controlId="noteTitle">
                        <FormLabel color="blue">Title</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={ this.state.noteTitle }
                            onChange= { this.handleChange }
                        />
                    </FormGroup>

                    <FormGroup controlId="noteBody">
                        <FormLabel color="blue">Body</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={ this.state.noteBody }
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
                        Add
                    </Button>
                </form>
            </div>
        )
    }
}

export default Notes;