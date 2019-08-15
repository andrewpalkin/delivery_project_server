const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send({msg: 'You are not authenticated–either not authenticated at all or authenticated incorrectly–but please reauthenticate and try again.'});
    }
};

router.get('/admin', auth, (req, res) => {
    res.send('Admin page!');
});

module.exports = router;