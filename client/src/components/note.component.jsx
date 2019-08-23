import React from 'react';

import { Card } from 'react-bootstrap';

import './styles/note.component.css';
import Footer from './footer';

export const NoteComponent = (props) => {
    let i = 0;
    return (
        <div className="note-container">
            <Card>
                <Card.Header as="h4">{ props.note.title }</Card.Header>
                <Card.Body>
                    <Card.Text>{ props.note.body }</Card.Text>
                </Card.Body>
                <Footer>
                    { props.note.dateCreated }
                </Footer>
            </Card>
            <h3 className="note-title" key={ ++i }>{ props.note.title }</h3>
            <p className="note-body" key={ ++i }>{ props.note.body }</p>
        </div>
    );
}