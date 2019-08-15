const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('User generate auth token', () => {
    it('should return a valid JSon web token', () => {
        const mongooseUser = { 
            _id: mongoose.Types.ObjectId().toHexString() 
        };
        const user = new User(mongooseUser);
        const authToken = user.generateAuthToken();
        const payload = jwt.verify(authToken, config.get('jwtPrivateKey'));
        expect(payload).toMatchObject(mongooseUser);
    });
});