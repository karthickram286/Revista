const winstonLogger = require('./middleware/winstonLogger');
const config = require('config');
const express = require('express');

const app = express();
require('./startup/routes.startup')(app);
require('./startup/mongoose.startup')();

// For Synchronous errors anywhere inside the application
process.on('uncaughtException', (ex) => {
    console.log('Uncaught Exception...' + ex.message);
    winstonLogger.error(ex.message, ex);
});

// For ASynchronous errors(Promise rejections) anywhere inside the application
process.on('unhandledRejection', (ex) => {
    console.log('Unhandled Promise Rejection...' + ex.message);
    winstonLogger.error(ex.message, ex);
});

// Checking for JWT token
if (!config.get('jwtPrivateKey')) {
    console.error('JWT Private key not available.... Quitting the application');
    process.exit(1);
}

const port = process.env.PORT || 4000;

// Starting server 
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
