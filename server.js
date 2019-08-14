const winstonLogger = require('./middleware/winstonLogger');
const errorHandler = require('./middleware/error');
const config = require('config');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv').config();

process.on('uncaughtException', (ex) => {
    console.log('Uncaught Exception...' + ex.message);
    winstonLogger.error(ex.message, ex);
});

// Checking for JWT token
if (!config.get('jwtPrivateKey')) {
    console.error('JWT Private key not available.... Quitting the application');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 4000;

const rateLimiter = rateLimit({
    max: 250,
    windowMs: 60 * 60 * 1000, // 1 hour  
    message: "Too many requests from this IP, Please try after some time."
});

// MongoDB Connectivity
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB....'))
    .catch((err) => console.log('Error: ', err.message));

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

// Starting server 
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

app.get('/', (req, res) => {
    res.send(`Welcome to Revista...`);
});
