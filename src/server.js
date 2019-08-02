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

// Starting server in port 4000 
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

app.get('/', (req, res) => {
    res.send(`Welcome to Revista...`);
});