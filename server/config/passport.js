const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Load user model
const User = require('../models/User');

passport.serializeUser(function (user, done) {
    console.log('serializeUser: ', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserializeUser: ', id);
    User.findById(id, function (err, user) {
        done(null, user);
    });
});

passport.use(
    new LocalStrategy({usernameField: 'email'}, function (
        email,
        password,
        done
    ) {
        //Match user
        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    // User Exists
                    console.log('The user with this email not exist');
                    return done(null, false);
                }

                // Match the password
                bcrypt.compare(password, user.password, (err, isMatch) => {

                    if (err) {
                        console.log(err);
                        return done(null, false);
                    }

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            })
            .catch(err => console.log(err));
    })
);
