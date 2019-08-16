const express = require('express');
const winstonLogger = require('./middleware/winstonLogger');

const app = express();
require('./startup/logging.startup')();
require('./startup/mongoose.startup')();
require('./startup/config.startup')();
require('./startup/routes.startup')(app);

const port = process.env.PORT || 4000;

// Starting server 
const server = app.listen(port, () => {
    winstonLogger.info(`Started server on port ${port}`);
});

module.exports = server;
