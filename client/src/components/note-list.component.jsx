import React from 'react';

import { NoteComponent } from './note.component';

import './styles/note-list.component.css'
import { CardDeck } from 'react-bootstrap';

export const NoteList = (props) => {
    return(
        <div className="notes">
            <CardDeck>
                {
                    props.notes.map(note => (
                        <NoteComponent key={ note._id } note={ note } />
                    ))
                }
            </CardDeck>
        </div>
    );
}