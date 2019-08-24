import React from 'react';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';

class NoteComponent extends React.Component {

    state = {
        domain: window.location.hostname,
        cardHover: false,
        title: this.props.note.title,
        body: this.props.note.body,
        noteId: this.props.note._id,
        userId: localStorage.getItem('userId')
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

    editNote = () => {
        alert('edit clicked');
    }

    deleteNote = () => {
        alert('delete clicked');
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
                                    <span className="pencil glyphicon glyphicon-pencil" onClick={this.editNote}></span> 
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