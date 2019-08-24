const mongoose = require('mongoose');

// Creating a model for Note
const Note = mongoose.model('Note', new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    title: { 
        type: String, 
        required: true 
    },
    body: {
        type: String, 
        required: true 
    },
    lastModified: { 
        type: String, 
        required: true 
    }
}));

module.exports = Note;