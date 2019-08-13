/**
 * Async Middleware function which is called by express and it returns a 
 * handler function which has parameters request, response and next.
 */
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            //This will call the error handler middleware if something fails.
            next(ex);
        }
    };
}