const mongoose = require('mongoose');

// Creating a model for User
const User = mongoose.model('Note', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}));

module.exports = User;