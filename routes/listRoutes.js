const express = require('express');
const router = express.Router();
const Note = require('../model/note');

// Adding a new note
router.post('/addNote', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    // let isNoteExists = checkIfNoteExists(title);
    // if (isNoteExists) {
    //     res.send('Note with same title already exists');
    //     return;
    // }
    let saveStatus = saveNote(title, body);
    if (saveStatus) {
        res.send('Note added successfully...');
    } else {
        res.send(`Can't add note`);
    }
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
        return true;
    } catch(err) {
        console.log(`Can't add note `, err.message);
        return false;
    }
}

// Check if note with that title already exists
// function checkIfNoteExists(noteTitle) {
//     console.log(noteTitle);
//     const note = await Note.findOne({
//         title: noteTitle
//     });
//     if (note) {
//         return true;
//     }
//     return false;
// }

// Getting a note with ID
router.get('/getNote/:id', async (req, res) => {
    let id = req.params.id;
    const note = await Note.findById(id);
    res.send(note);
});

// Get all notes
router.get('/getAllNotes', async (req, res) => {
    const notes = await Note.find().select('title body dateCreated lastModified');
    res.send(notes);
});

// Update a note by id
router.post('/updateNote/:id', async (req, res) => {
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
});

// Remove a note by id
router.delete('/deleteNote/:id', async (req, res) => {
    let id = req.params.id;
    await Note.findByIdAndDelete({_id: id});
    res.send('Note deleted successfully');
});

module.exports = router;