import React from 'react';
import { Button, FormGroup, FormControl, FormLabel, Badge } from 'react-bootstrap';

import NoteList from './note-list.component';

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
            status: '',
            notes: [

            ]
        }
    }

    fetchNotes() {
        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/getAllNotes';
        } else {
            url = 'https://' + this.state.domain + '/api/notes/getAllNotes';
        }
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'GET',
                    headers: {
                        'x-auth-token': this.state.authToken,
                        'x-user-id': localStorage.getItem('userId')
                    }
            }).then(response => response.json())
                .then(allNotes => {
                    this.setState( { notes: allNotes });
                });
        }
    }

    componentDidMount() {
        this.fetchNotes();
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
            userId: localStorage.getItem('userId'),
            title: this.state.noteTitle,
            body: this.state.noteBody,
            modifiedTime: Date.now()
        }
        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/addNote';
        } else {
            url = 'https://' + this.state.domain + '/api/notes/addNote';
        }   
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'x-auth-token': this.state.authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData)
            }).then(response => response.json())
                .then(addNote => {
                    if (addNote.id !== undefined) {
                        this.setState({ status: 'Note added successfully'});
                        setTimeout(this.fetchNotes(), 1000);
                    } else {
                        this.setState({ status: addNote.status});
                    }
                }).catch((err) => {
                        this.setState({ status: `Can't access...Authentication token not provided` });
                });
        } else {
            this.setState({ status : 'Log in to add note'});
        }
    }

    resetStatus = () => {
        this.setState({ status: '' });
    }

    render() {
        return(
            <div>
                <div className="notes-page">
                    <form onSubmit= { this.handleSubmit } onChange={ this.resetStatus }>
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
                                as="textarea" 
                                rows="5"
                                autoFocus
                                type="text"
                                value={ this.state.noteBody }
                                onChange= { this.handleChange }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Badge pill variant="info">{ this.state.status }</Badge>
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

                <div className="note-list">
                    <NoteList notes={ this.state.notes } />
                </div>
            </div>
        );
    }
}

export default Notes;