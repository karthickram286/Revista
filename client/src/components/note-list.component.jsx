import React from 'react';

import NoteComponent from './note.component';

import './styles/note-list.component.css'

export const NoteList = (props) => {
    return(
        <div className="note-list">
            {
                props.notes.map(note => (
                    <NoteComponent key={ note._id } note={ note } />
                ))
            }
        </div>
    );
}