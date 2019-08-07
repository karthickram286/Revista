const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const routes = require('./routes/listRoutes');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const rateLimiter = rateLimit({
    max: 250,
    windowMs: 60 * 60 * 1000, // 1 hour  
    message: "Too many requests from this IP, Please try after some time."
});

app.use(rateLimiter);
app.use(express.json());

// Starting server 
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

// Routing
app.use('/api/notes', routes);

// MongoDB Connectivity
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB....'))
    .catch((err) => console.log('Error: ', err.message));

app.get('/', (req, res) => {
    res.send(`Welcome to Revista...`);
});





// let id = 0;
// let journalArr = new Array();

// // Creating a schema for Note
// const noteSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         required: true 
//     },
//     body: {
//         type: String, 
//         required: true 
//     },
//     dateCreated: { 
//         type: Date,
//         default: Date.now,
//         required: true 
//     },
//     lastModified: { 
//         type: Date, 
//         default: Date.now,
//         required: true 
//     }
// });

// app.post('/api/addNote', (req, res) => {
//     let title = req.body.title;
//     let body = req.body.body;
//     let journal = {};
//     journal.title = title;
//     journal.body = body;
//     journal.id = id++;
//     journalArr.push(journal);
//     res.send(journal);
// });

// app.get('/api/getNote/:id', (req, res) => {
//     for (let i = 0; i < journalArr.length; i++) {
//         if (req.params.id == i + 1) {
//             let journalResponse = journalArr[i];
//             res.send(journalResponse);
//             return;
//         }
//     }
//     res.send('Not found');
// });

// app.get('/api/getAllNotes', (req, res) => {
//     for (let i = 0; i < journalArr.length; i++) {
//         res.send(journalArr);
//         return;
//     }
//     return {};
// })