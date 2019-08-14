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
        return res.redirect('/');
    }
};

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('Укажите правильный email или пароль!');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
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
    const {email, password, createDate, updateDate, verification} = req.body;

    let errors = [];
    //Check for mandatory fields
    if (!email || !password) {
        errors.push({msg: 'Please pass all mandatory fields'});
    }

    //Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.status(500).send(errors);
    } else {
        // Validation passed
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    // User Exists
                    console.log('The user with this email already exist');

                    errors.push({msg: 'The user with this email already exist'});
                    res.status(500).send(errors);
                } else {
                    rand=Math.floor((Math.random() * 100) + 54);
                    const newUser = new User({
                        email: email,
                        password: password,
                        createDate: createDate,
                        updateDate: updateDate,
                        verification: rand
                    });

                    sendEmail({userMail: newUser.email,verification: rand, host: req.get('host')});    
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json({
                                    id: user._id,
                                    email: user.email,
                                    verification: user.verification,
                                    createDate: user.createDate
                                }))
                                .catch(user => console.log(err))
                        });
                    });
                }
            })
            .catch(err => console.log(err));
    }
});

router.get('/verify/:verification',function(req, res){
    console.log(req.protocol+":/"+req.get('host'));
    console.log(req.params.verification);
    User.findOne({'verification': req.params.verification}, function(err, user) {
        if(user.verification === req.params.verification) {
            console.log('Code is valid! User Verification is passed');
            User.updateOne({'verification': req.params.verification}, {$set: {'verification': 'true'}}, function(err, res) {                
                console.log('User was been verifyed');                
            });
            res.redirect('/login');
        } else {
            console.log('The ID is vrong, Reject the User');
        }
    });
});    

module.exports = router;