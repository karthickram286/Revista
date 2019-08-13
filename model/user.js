const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// Creating a User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.*@.*/
    },
    password: {
        type: String,
        required: true,
    }
});

// Method to generate Auth token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
}

// Creating a model for User
const User = mongoose.model('User', userSchema);

module.exports = User;