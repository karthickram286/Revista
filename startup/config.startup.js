const config = require('config');

module.exports = function() {
    // Checking for JWT token
    if (!config.get('jwtPrivateKey')) {
        throw new Error('JWT Private key not available.... Quitting the application');
    }
}