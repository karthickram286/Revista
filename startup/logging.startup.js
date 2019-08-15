const winstonLogger = require('../middleware/winstonLogger');

module.exports = function() {
    // For Synchronous errors anywhere inside the application
    process.on('uncaughtException', (ex) => {
        console.log('Uncaught Exception...' + ex.message);
        winstonLogger.error(ex.message, ex);
        process.exit(1);
    });

    // For ASynchronous errors(Promise rejections) anywhere inside the application
    process.on('unhandledRejection', (ex) => {
        console.log('Unhandled Promise Rejection...' + ex.message);
        winstonLogger.error(ex.message, ex);
    });
}