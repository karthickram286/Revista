import React from 'react';

import NoteComponent from './note.component';

import './styles/note-list.component.css'

class NoteList extends React.Component {

    getSortedNotes = (notes) => {
        let sortedNotes = notes.sort((a, b) => {
            return b.lastModified - a.lastModified;
        });
        return sortedNotes;
    }

    render() {
        let sortedNotes = this.getSortedNotes(this.props.notes);
        return(
            <div className="note-list">
                {
                    sortedNotes.map(note => (
                        <NoteComponent key={ note._id } note={ note } />
                    ))
                }
            </div>
        );
    }
}

export default NoteList;