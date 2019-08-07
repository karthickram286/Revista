const mongoose = require('mongoose');

// Creating a model for Note
const Note = mongoose.model('Note', new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    body: {
        type: String, 
        required: true 
    },
    dateCreated: { 
        type: Date,
        default: Date.now,
        required: true 
    },
    lastModified: { 
        type: Date, 
        default: Date.now,
        required: true 
    }
}));

module.exports = Note;