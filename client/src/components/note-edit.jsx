import React from 'react';

import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/note-edit.css';

class NoteEdit extends React.Component {
    constructor(props)    {
        super(props);

        this.state = {
            domain: window.location.hostname,
            authToken: document.cookie.split('=')[1],
            isUsedSignedIn: this.getUserSignedIn(),
            noteTitle: '',
            noteBody: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let url = '';
        let noteId = this.props.match.params.noteId;
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/getNote/' + noteId;
        } else {
            url = 'https://' + this.state.domain + '/api/notes/getNote/' + noteId;
        }   
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'x-auth-token': this.state.authToken,
                    'x-user-id': localStorage.getItem('userId')
                }
            }).then(response => response.json())
                .then(note => {
                    this.setState({ noteTitle: note[0].title, noteBody: note[0].body, noteId: note[0]._id });
                });
        }
    }

    getUserSignedIn() {
        if (document.cookie.split('=')[1] !== undefined) {
            return true;
        }
        return false;
    }

    editNote = () => {
        let updateNoteData = {
            userId: localStorage.getItem('userId'),
            title: this.state.noteTitle,
            body: this.state.noteBody,
            modifiedTime: Date.now()
        }

        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/updateNote/' + this.state.noteId;
        } else {
            url = 'https://' + this.state.domain + '/api/notes/updateNote' + this.state.noteId;
        }   
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'x-auth-token': this.state.authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateNoteData)
            }).then(response => response.json())
                .then(updateNote => {
                    alert(updateNote.status);
                }).catch((err) => {
                    alert(`Can't update note`);
                    });
        } 
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value,
          status: ''
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    gotoPreviousPage = () => {
        window.history.back();
    }

    render() {

        return (
            <div className="note-edit">
                <form onSubmit= { this.handleUpdate }>
                    <FormGroup controlId="noteTitle">
                        <FormLabel color="blue">Title</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value= { this.state.noteTitle }
                            onChange={ this.handleChange }
                        />
                    </FormGroup>

                    <FormGroup controlId="noteBody">
                        <FormLabel color="blue">Body</FormLabel>
                        <FormControl 
                            as="textarea" 
                            type="text"
                            rows="5"
                            value= { this.state.noteBody }
                            onChange= { this.handleChange }
                        />
                    </FormGroup>

                    <Button style={{marginRight: 15}} onClick={ this.editNote } className="btn btn-success">Edit</Button>
                    <Button style={{marginRight: 15}} onClick={  this.gotoPreviousPage } className="btn btn-info">Back</Button>
                </form>
            </div>
        )
    }
}

export default NoteEdit;