const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

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
                    const newUser = new User({
                        email: email,
                        password: password,
                        createDate: createDate,
                        updateDate: updateDate,
                        verification: verification
                    });

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

module.exports = router;