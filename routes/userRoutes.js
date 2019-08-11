const express = require('express');
const router = express.Router();
const User = require('../model/user');  
const passwdValidator = require('password-validator');
const bcrypt = require('bcrypt');

// Adding a new User (User Sign Up)
router.post('/addUser', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    if (!validateEmail(email, res)) {
        return;
    }
    if (!validatePassword(password, res)) {
        return;
    }
    let saveStatus = saveUser(name, email, password);
    saveStatus.then(result => {
                    res.send('User added Successfully')  ;
                }).catch(err => {
                    res.send(err.message);
                });
});

// Authenticating User (User Sign in)
router.post('/signInUser', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!validateEmail(email, res)) {
        return;
    }
    if (!validatePassword(password, res)) {
        return;
    }
    let user = await User.findOne({ email: email });
    console.log(user);
    res.send(user);
});


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
        return false;
    }
    return true;
}

function validatePassword(password, res) {
    let isValidPassword = passwordSchema.validate(password);
    if (!isValidPassword) {
        console.log('Invalid Password');
        res.send(`Password doesn't meet requirements`);
        return false;
    }
    return true;
}

module.exports = router;
