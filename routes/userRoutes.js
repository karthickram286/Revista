const asyncMiddleware = require('../middleware/asyncMiddleware');
const authorize = require('../middleware/authorize');
const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../model/user');  
const passwdValidator = require('password-validator');
const bcrypt = require('bcrypt');

router.all('*', cors());

// Adding a new User (User Sign Up)
router.post('/addUser', asyncMiddleware( async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    console.log('Incoming req :' + req + ' ' + req.body + ' ' + name + ' ' + email + ' ' + password);
    if (!validateEmail(email, res)) {
        return;
    }
    if (!validatePassword(password, res)) {
        return;
    }
    let userExists = false;
    let checkUserResult = await checkUser(email);
    if (checkUserResult) {
        userExists = true;
        return res.status(400).send(
            {error: 'User already exists'}
        );
    }
    if (!userExists) {
        let registeredUser = saveUser(name, email, password);
        registeredUser.then(result => {
            const token = result.generateAuthToken();
            res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));
        }).catch(err => {
            res.send({
                error: err.message
            });
        });
    }
}));

// Authenticating User (User Sign in)
router.post('/signInUser', asyncMiddleware(async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!validateEmail(email, res)) {
        return;
    }
    if (!validatePassword(password, res)) {
        return;
    }
    let user = await User.findOne({ email: email });

    // If User is not present in DB
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }

    const token = user.generateAuthToken();
    res.send({ authToken: token });
}));

// Delete user
router.delete('/deleteUser', async (req, res) => {
    let email = req.body.email;

    let deleteStatus = await  User.deleteOne({ email: email});
    if (deleteStatus) {
        res.send(`User deleted successfully`);
    }
});

// Getting User Information
router.get('/me', authorize, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('name email');
    res.send(user);
}));

// Saving a User
async function saveUser(name, email, password) {
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    
    // Hashing the password
    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(password, salt);
    const result = await user.save();
    return result;
}

async function checkUser(email) {
    const user = await User.findOne({email: email});
    if (user) {
        console.log('User with same email-id already exists');
        return true;
    }
    return false;
}

/**
 * User Validation
 */
const emailSchema = new passwdValidator();
emailSchema.is().min(6)
            .is().max(100)
            .has().lowercase()
            .has().not().spaces();

const passwordSchema = new passwdValidator();
passwordSchema.is().min(6)
              .is().max(50)
              .has().lowercase()
              .has().uppercase()
              .has().digits()
              .has().not().spaces();

function validateEmail(email, res) {
    let isValidEmail = emailSchema.validate(email);
    if(!isValidEmail) {
        console.log('Invalid Email-Id');
        res.status(400).send({
            error: `Email-ID not valid`
        });
        return false;
    }
    return true;
}

function validatePassword(password, res) {
    let isValidPassword = passwordSchema.validate(password);
    if (!isValidPassword) {
        console.log('Invalid Password: ' + password);
        res.status(400).send({
            error: `Password doesn't meet requirements`
        });
        return false;
    }
    return true;
}

module.exports = router;
