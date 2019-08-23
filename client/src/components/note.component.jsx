import React from 'react';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';
import Footer from './footer';

export const NoteComponent = (props) => {
    console.log(props.note);
    return (
        <div className="noteCard">
            <Card style={{ width: '18rem' }}>
                <Card.Header as="h4" bg="info">{ props.note.title }</Card.Header>
                <Card.Body>
                    <Card.Text>{ props.note.body }</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{ props.note.dateCreated }</small>
                    <small className="text-muted">{ props.note.lastModified }</small>
                </Card.Footer>
            </Card>
        </div>
    );
}