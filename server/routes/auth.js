const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/mailer');
const auth = require('../utils/authentication');

//User Model
const User = require('../models/User');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        console.log('login Service ---------------------------------', info);
        if (err) {
            return res.status(500).send({msg: 'Please check server for error details', errCode: 'SERVER_ERROR'});
        }
        if (!user) {
            return res.status(401).send({msg: 'The email or password was not match in DB', errCode: 'NOT_MATCH'});
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).send({msg: 'Please check server for error details', errCode: 'SERVER_ERROR'});
            }
            if (user.verification !== 'DONE') {
                return res.status(403).send({
                    msg: 'Verification of email was not done',
                    errCode: 'VERIFICATION_NOT_DONE'
                });
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
        res.status(400).send({name: errors.name, msg: errors.message, errCode: 'VALIDATION_ERROR'});
    } else {
        // Validation passed
        User.findOne({email: newUser.email})
            .then(user => {
                if (user) {
                    // User Exists
                    console.log('The user with this email already exist');
                    res.status(403).send({msg: 'The user with this email already exist', errCode: 'EXIST_EMAIL'});
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
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).send({
                                        msg: 'Please check server for error details',
                                        errCode: 'SERVER_ERROR'
                                    });
                                });
                            sendEmail({
                                userMail: newUser.email,
                                verificationString: newUser.verificationString,
                                host: req.get('host')
                            });
                        });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({msg: 'Please check server for error details', errCode: 'SERVER_ERROR'});
            });
    }
});

router.get('/verify', (req, res) => {
    console.log(req.protocol + ":/" + req.get('host'));
    console.log(req.query.verificationString);

    User.findOne({email: req.query.email, verificationString: req.query.verificationString})
        .then(user => {
            if (user) {
                if ('DONE' === user.verification) {
                    console.log('The current user already verified');
                    res.status(400).send({msg: 'The current user already verified', errCode: 'ALREADY_VERIFIED'});
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
                    .catch(err => {
                        console.log(err);
                        return res.status(500).send({
                            msg: 'Please check server for error details',
                            errCode: 'SERVER_ERROR'
                        });
                    })
            } else {
                // User Exists
                console.log('The user with this verification number not exist');
                res.status(400).send({
                    msg: 'The user with this verification number not exist',
                    errCode: 'VERIFICATION_NUMBER_NOT_EXIST'
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({msg: 'Please check server for error details', errCode: 'SERVER_ERROR'});
        });
});

module.exports = router;