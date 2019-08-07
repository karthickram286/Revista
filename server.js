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
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB....'))
    .catch((err) => console.log('Error: ', err.message));

app.get('/', (req, res) => {
    res.send(`Welcome to Revista...`);
});