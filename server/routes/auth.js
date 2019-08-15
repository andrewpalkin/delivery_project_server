const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/mailer');

//User Model
const User = require('../models/User');

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send({msg: 'You are not authenticated–either not authenticated at all or authenticated incorrectly–but please reauthenticate and try again.'});
    }
};

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.status(500).send({msg: 'Please check server for error details'});
        }
        if (!user) {
            return res.status(500).send({msg: 'The email or password was not match in DB'});
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).send({msg: 'Please check server for error details'});
            }
            if(user.verification !== 'DONE'){
                return res.status(403).send({msg: 'Verification of email was not done'});
            }

            return res.json({
                id: user._id,
                email: user.email,
                verification: user.verification,
                createDate: user.createDate
            });
        });
    })(req, res, next);
});

router.get('/logout', auth, (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.post('/register', (req, res) => {

    const newUser = new User(req.body);
    let errors = newUser.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        // Validation passed
        User.findOne({email: newUser.email})
            .then(user => {
                if (user) {
                    // User Exists
                    console.log('The user with this email already exist');
                    res.status(500).send({msg: 'The user with this email already exist'});
                } else {
                    newUser.verificationString = Math.random().toString(36).substr(2);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json({
                                    id: user._id,
                                    email: user.email,
                                    verification: user.verification,
                                    createDate: user.createDate
                                }))
                                .catch(err => console.log(err));
                            sendEmail({
                                userMail: newUser.email,
                                verificationString: newUser.verificationString,
                                host: req.get('host')
                            });
                        });
                    });
                }
            })
            .catch(err => console.log(err));
    }
});

router.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    console.log(req.query.verificationString);

    User.findOne({email: req.query.email, verificationString: req.query.verificationString})
        .then(user => {
            if (user) {
                if ('DONE' === user.verification) {
                    console.log('The current user already verified');
                    res.status(500).send({msg: 'The current user already verified'});
                }

                console.log('Code is valid! User Verification is passed');
                user.verification = 'DONE';
                user.updateDate = Date.now();

                user.save()
                    .then(user => res.json({
                        id: user._id,
                        email: user.email,
                        verification: user.verification,
                        createDate: user.createDate
                    }))
                    .catch(err => console.log(err))
            } else {
                // User Exists
                console.log('The user with this verification number not exist');
                res.status(500).send({msg: 'The user with this verification number not exist'});
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;