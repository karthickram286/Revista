const asyncMiddleware = require('../middleware/asyncMiddleware');
const authorize = require('../middleware/authorize');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const Note = require('../model/note');

router.all('*', cors());

// Adding a new note
router.post('/addNote', authorize, asyncMiddleware(async (req, res) => {
    let userId = req.body.userId;
    let title = req.body.title;
    let body = req.body.body;
    let modifiedTime = req.body.modifiedTime;
    
    let addedNote = await saveNote(userId, title, body, modifiedTime);
    if (addedNote) {
        res.status(200).send({
            id: addedNote._id,
            status: 'Note added successfully...',
        });
    } else {
        res.status(500).send({ 
            status: `Can't add note`
        });
    }
}));

// Saving a note
async function saveNote(userId, title, body, modifiedTime) {
    try {
        const note = new Note({
            userId,
            title,
            body,
            lastModified: modifiedTime
        });
        const result = await note.save();
        return result;
    } catch(err) {
        console.log(`Can't add note `, err.message);
        return false;
    }
}

// Getting a note with ID
router.get('/getNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let id = req.params.id;
    let userId = req.header('x-user-id');
    const note = await Note.find({ userId: userId, _id: id });
    res.send(note);
}));

// Get all notes
router.get('/getAllNotes', authorize, asyncMiddleware(async (req, res) => {
    let userId = req.header('x-user-id');
    try {
        const notes = await Note.find({ userId: userId }).select('title body lastModified');
        res.send(notes);
    } catch(err) {
        console.log(`Can't get note. Reason: ` + err.message);
        res.send(`Can't get Note`);
    }
}));

// Update a note by id
router.post('/updateNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let userId = req.body.userId;
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let id = req.params.id;
    let modifiedTime = req.body.modifiedTime;

    try {
        await Note.findByIdAndUpdate({ userId: userId, _id: id }, {
            $set: {
                title: newTitle,
                body: newBody,
                lastModified: modifiedTime
            }
        });
        res.status(200).send({ status: 'Note updated successfully' });
    } catch(err) {
        console.log(`Can't update note. Reason: ` + err.message);
        res.status(500).send({ status: `Can't update note` });
    }
}));

// Remove a note by id
router.delete('/deleteNote/:id', authorize, asyncMiddleware(async (req, res) => {
    let userId = req.body.userId;
    let id = req.params.id;
    try {
        await Note.findOneAndDelete({ userId: userId,  _id: id });
        res.status(200).send({ status: 'Note deleted successfully' });
    } catch (err) {
        console.log(`Can't delete note. Reason: ` + err.message);
        res.status(500).send({ status: `Can't delete note.` });
    }
}));

module.exports = router;