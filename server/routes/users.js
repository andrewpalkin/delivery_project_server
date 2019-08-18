const express = require('express');
const router = express.Router();
const auth = require('../utils/authentication');

//UserDetails Model
const UserDetails = require('../models/UserDetails');

router.post('/saveDetails', auth, (req, res) => {

    const newUserDetails = new UserDetails(req.body);
    let errors = newUserDetails.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        // Validation passed
        UserDetails.findOne({userID: newUserDetails.userID})
            .then(userDetails => {
                if (userDetails) {
                    userDetails.firstName = newUserDetails.firstName;
                    userDetails.secondName = newUserDetails.secondName;
                    userDetails.addressID = newUserDetails.addressID;
                    userDetails.updateDate = Date.now();

                    userDetails
                        .save()
                        .then(userDetails => res.json({
                            userID: userDetails.userID,
                            createDate: userDetails.createDate,
                            updateDate: userDetails.updateDate
                        }))
                        .catch(err => console.log(err));
                } else {
                    newUserDetails
                        .save()
                        .then(userDetails => res.json({
                            userID: userDetails.userID,
                            createDate: userDetails.createDate
                        }))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }
});

router.get('/userDetails', auth, (req, res) => {
    console.log(req.query.userID);

    UserDetails.findOne({userID: req.query.userID})
        .then(userDetails => {
            if (userDetails) {
                res.json({
                    createDate: userDetails.createDate,
                    updateDate: userDetails.updateDate,
                    userID: userDetails.userID,
                    firstName: userDetails.firstName,
                    secondName: userDetails.secondName
                })
            } else {
                // User Exists
                console.log('The userDetails with this userID number not exist');
                res.status(500).send({msg: 'The userDetails with this userID number not exist'});
            }
        })
        .catch(err => console.log(err));
});

router.get('/admin', auth, (req, res) => {
    res.send('Admin page!');
});

module.exports = router;