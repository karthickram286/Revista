const express = require('express');
const router = express.Router();
const User = require('../model/user');  
const passwdValidator = require('password-validator');

// Adding a new User
router.post('/addUser', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    validateEmail(email, res);
    validatePassword(password, res);
    let saveStatus = saveUser(name, email, password);
    if (saveStatus) {
        res.send('User added Successfully');
    } else {
        res.send(`Can't add user`);
    }
});

// Saving a User
async function saveUser(name, email, password) {
    try {
        const user = new User({
            name: name,
            email: email,
            password: password
        });
        const result = await user.save();
        return true;
    } catch (err) {
        console.log(`Can't add user : ` + err.message);
        return false;
    }
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
        res.send(`Email-ID not valid`);
    }
}

function validatePassword(password, res) {
    let isValidPassword = passwdValidator.validate(password);
    if (!isValidPassword) {
        console.log('Invalid Password');
        res.send(`Password doesn't meet requirements`);
    }
}
