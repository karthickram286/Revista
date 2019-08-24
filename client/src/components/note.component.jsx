import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';

class NoteComponent extends React.Component {

    state = {
        domain: window.location.hostname,
        cardHover: false,
        authToken: document.cookie.split('=')[1],
        isUsedSignedIn: this.getUserSignedIn(),
        title: this.props.note.title,
        body: this.props.note.body,
        noteId: this.props.note._id,
        userId: localStorage.getItem('userId'),
        editLink: {
            pathName: "/noteEdit/" + this.props.note._id
        }
    }

    getUserSignedIn() {
        if (document.cookie.split('=')[1] !== undefined) {
            return true;
        }
        return false;
    }

    // Referred from 
    // https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
    getLastModifiedTime = (current, previous) => {
        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let msPerMonth = msPerDay * 30;
        let msPerYear = msPerDay * 365;
    
        let elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    getNoteValues = () => {
        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/getNote/' + this.props.match.params.noteId;
        } else {
            url = 'https://' + this.state.domain + '/api/notes/getNote/' + this.props.match.params.noteId;
        }   
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'x-auth-token': this.state.authToken,
                    'x-user-id': localStorage.getItem('userId'),
                    'Content-Type': 'application/json',
                }, 
            }).then(response => response.json())
                .then(note => {
                    this.setState({ noteTitle: note.title, noteBody: note.body });
                })
                .catch((err) =>  {
                    alert(`Can't get note details.`);
                });
            }
    }

    deleteNote = () => {
        let deleteNoteData = {
            userId: localStorage.getItem('userId'),
        }

        let url = '';
        if (this.state.domain === 'localhost') {
            url = 'http://localhost:4000/api/notes/deleteNote/' + this.state.noteId;
        } else {
            url = 'https://' + this.state.domain + '/api/notes/deleteNote/' + this.state.noteId;
        }   
        if (this.state.isUsedSignedIn === true) {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': this.state.authToken,
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(deleteNoteData)
            }).then(response => response.json())
                    .then(updateNote => {
                        alert(updateNote.status);
                    }).catch((err) => {
                        alert(`Can't update note`);
                    });;
        } else {
            alert('User not signed in')
        }
    }

    cardMouseEnter = () => {
        this.setState({ cardHover: true });
    }

    cardMouseLeave = () => {
        this.setState({ cardHover: false });
    }

    render() {
        return (
            <div className="noteCard">

                <Card border="primary" bg="light" onMouseEnter={ this.cardMouseEnter } onMouseLeave= { this.cardMouseLeave }>
                    <Card.Header as="h4">
                        <strong>
                            { this.props.note.title }
                        </strong>
                        {   
                            this.state.cardHover ?
                                <small>
                                    <Link to={ this.state.editLink.pathName } >
                                        <span className="pencil glyphicon glyphicon-pencil"></span>
                                    </Link>
                                    <span className="pencil glyphicon glyphicon-trash" onClick={this.deleteNote}></span>
                                </small>
                             : ""   
                        }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{ this.props.note.body }</Card.Text>
                        <Card.Text className="invisible">{ this.props.note._id }</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last modified { this.getLastModifiedTime(Date.now(), this.props.note.lastModified ) }</small>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default NoteComponent;