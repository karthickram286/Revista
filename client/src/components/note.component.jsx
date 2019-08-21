import React from 'react';

export const NoteComponent = (props) => {
    return (
        <div className="note">
            <h3 key={ props.note.id }>{ props.note.title }</h3>
            <h5 key={ props.note.id }>{ props.note.boyd }</h5>
        </div>
    );
}