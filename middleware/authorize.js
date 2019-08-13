const jwt = require('jsonwebtoken');
const config = require('config');

function authorize(req, res, next) {
    const token = req.header('x-auth-token');

    // If token is not provided
    if (!token) {
        return res.status(401).send('Auth token not provided');
    }

    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

module.exports = authorize;