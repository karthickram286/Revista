const logger = require('./winstonLogger');

module.exports = function(err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).send(`It's not you, It's us.... Something failed`);
}