const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 4000;

const rateLimiter = rateLimit({
    max: 250,
    windowMs: 60 * 60 * 1000, // 1 hour  
    message: "Too many requests from this IP, Please try after some time."
});

app.use(rateLimiter);
app.use(express.json());

// Starting server in port 4000 
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

app.get('/', (req, res) => {
    res.send(`Welcome to Revista...`);
});

let id = 0;
let journalArr = new Array();

app.post('/api/addNote', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let journal = {};
    journal.title = title;
    journal.body = body;
    journal.id = id+1;
    journalArr.push(journal);
    res.send(journal);
});

app.get('/api/getNote/:id', (req, res) => {
    for (let i = 0; i < journalArr.length; i++) {
        if (req.params.id == i + 1) {
            let journalResponse = journalArr[i];
            res.send(journalResponse);
            return;
        }
    }
    res.send('Not found');
});