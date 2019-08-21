import React from 'react';

import { NoteComponent } from './note.component';

export const NoteList = (props) => {
    return(
        <div className="note-list">
            {
                props.notes.map(note => {
                    <NoteComponent key={ note.id } note={ note }></NoteComponent>
                })
            }
        </div>
    );
}