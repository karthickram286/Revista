import React from 'react';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';
import Footer from './footer';

export const NoteComponent = (props) => {
    console.log(props.note);
    return (
        <div className="noteCard">
            <Card>
                <Card.Header as="h4">{ props.note.title }</Card.Header>
                <Card.Body>
                    <Card.Text>{ props.note.body }</Card.Text>
                </Card.Body>
                <Footer>
                    { props.note.dateCreated }
                </Footer>
            </Card>
        </div>
    );
}