const express = require('express');
const router = express.Router();
const Note = require('../model/note');

// Adding a new note
router.post('/addNote', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    saveNote(title, body);
    res.send('Note added successfully...');
});

// Getting a note with ID
router.get('/getNote/:id', (req, res) => {

});

// Get all notes
router.get('/getAllNotes', async (req, res) => {
    const notes = await Note.find().select('title body');
    res.send(notes);
    console.log(notes);
});

// Saving a note
async function saveNote(title, body) {
    try {
        const note = new Note({
            title,
            body
        });
        const result = await note.save();
        console.log(result);
    } catch(err) {
        console.log(`Can't add note `, err.message);
    }
}



module.exports = router;

