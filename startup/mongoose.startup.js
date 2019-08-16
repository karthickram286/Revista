const mongoose = require('mongoose');
const winstonLogger = require('../middleware/winstonLogger');
const config = require('config');

module.exports = function() {

    // MongoDB Connectivity
    mongoose.set('useCreateIndex', true);
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
        .then(() => winstonLogger.info(`Connected to ${db} MongoDB....`))
        .catch((err) => {
            winstonLogger.error(`Couldn't connect to MongoDB(mLab).... Terminating the application.` + err.message);
            process.exit(1);
        });
}