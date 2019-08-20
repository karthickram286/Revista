import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/notes.css';

class Notes extends React.Component {
    constructor() {
        super();

        this.state = {
            domain: window.location.hostname,
            authToken: document.cookie.split('=')[1],
            isUsedSignedIn: this.getUserSignedIn(),
            noteTitle: '',
            noteBody: '',
            status: ''
        }
    }

    getUserSignedIn() {
        if (document.cookie.split('=')[1] !== undefined) {
            return true;
        }
        return false;
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
        const noteData = {
            title: this.state.noteTitle,
            body: this.state.noteBody
        }
        console.log('status: ' + this.state.isUsedSignedIn);
        if (this.state.isUsedSignedIn === true) {
            console.log('User Signed in ' + this.state.noteTitle);
            fetch('https://' + this.state.domain + '/api/note/addNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData)
            }).then(response => response.json())
                .then(addNote => {
                    if (addNote.id !== undefined) {
                        this.setState({ status: 'Note added successfully'});
                    } else {
                        this.setState({ status: addNote.status});
                    }
                }).catch(() => {
                    this.setState({ status: `Can't access. Blocked by browser`});
                })
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