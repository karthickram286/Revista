const express = require('express');
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

    // Routing
    app.use('/api/notes', listRoutes);
    app.use('/api/user', userRoutes);

    // Error Middleware
    app.use(errorHandler);

    // Homepage router
    app.get('/', (req, res) => {
        res.send(`Welcome to Revista...`);
    });
};
