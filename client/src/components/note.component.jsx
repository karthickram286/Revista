import React from 'react';

import './styles/note.component.css';

export const NoteComponent = (props) => {
    let i = 0;
    return (
        <div className="note-container">
            <h3 className="note-title" key={ ++i }>{ props.note.title }</h3>
            <p className="note-body" key={ ++i }>{ props.note.body }</p>
        </div>
    );
}