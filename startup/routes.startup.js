const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');
const listRoutes = require('../routes/listRoutes');
const userRoutes = require('../routes/userRoutes');
const errorHandler = require('../middleware/error');

const rateLimiter = rateLimit({
    max: 250,
    windowMs: 60 * 60 * 1000, // 1 hour  
    message: "Too many requests from this IP, Please try after some time."
});

module.exports = function(app) {
    /**
     * Middlewares
     */
    app.use(express.json());
    app.use(rateLimiter);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routing
    app.use('/api/notes', listRoutes);
    app.use('/api/user', userRoutes);

    // Error Middleware
    app.use(errorHandler);

    // Static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
    }
};
