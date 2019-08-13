const asyncMiddleware = require('../middleware/asyncMiddleware');
const authorize = require('../middleware/authorize');
const express = require('express');
const router = express.Router();
const Note = require('../model/note');

// Adding a new note
router.post('/addNote', authorize, asyncMiddleware(async (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let saveStatus = await saveNote(title, body);
    if (saveStatus) {
        res.send('Note added successfully...');
    } else {
        res.send(`Can't add note`);
    }
}));

// Saving a note
async function saveNote(title, body) {
    try {
        const note = new Note({
            title,
            body
        });
        const result = await note.save();
        console.log(result);
        return true;
    } catch(err) {
        console.log(`Can't add note `, err.message);
        return false;
    }
}

// Getting a note with ID
router.get('/getNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let id = req.params.id;
    const note = await Note.findById(id);
    res.send(note);
}));

// Get all notes
router.get('/getAllNotes', authorize, asyncMiddleware(async (req, res) => {
    const notes = await Note.find().select('title body dateCreated lastModified');
    res.send(notes);
}));

// Update a note by id
router.post('/updateNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let id = req.params.id;
    await Note.findByIdAndUpdate({_id: id}, {
        $set: {
            title: newTitle,
            body: newBody,
            lastModified: Date.now()
        }
    });
    res.send('Note updated successfully');
}));

// Remove a note by id
router.delete('/deleteNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let id = req.params.id;
    await Note.findByIdAndDelete({_id: id});
    res.send('Note deleted successfully');
}));

module.exports = router;