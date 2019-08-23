import React from 'react';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';

export const NoteComponent = (props) => {
    console.log(props.note);
    return (
        <div className="noteCard">
            <Card bg="light">
                <Card.Header as="h4">{ props.note.title }</Card.Header>
                <Card.Body>
                    <Card.Text>{ props.note.body }</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last Modified: { props.note.lastModified }</small>
                </Card.Footer>
            </Card>
        </div>
    );
}