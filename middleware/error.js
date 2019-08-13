module.exports = function(err, req, res, next) {
    res.status(500).send(`It's not you, It's us.... Something failed`);
}