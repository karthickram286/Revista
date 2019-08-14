const winstonLogger = require('./winstonLogger');

module.exports = function(err, req, res, next) {
    winstonLogger.error(err.message, err);
    res.status(500).send(`It's not you, It's us.... Something failed`);
}