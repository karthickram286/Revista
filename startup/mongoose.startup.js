const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const winstonLogger = require('../middleware/winstonLogger');

module.exports = function() {

    // MongoDB Connectivity
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useFindAndModify: false })
        .then(() => winstonLogger.info('Connected to MongoDB....'))
        .catch((err) => {
            winstonLogger.error(`Couldn't connect to MongoDB(mLab).... Terminating the application.`, err.message);
            process.exit(1);
        });
}