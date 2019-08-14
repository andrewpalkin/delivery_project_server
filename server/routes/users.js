const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
};

router.get('/admin', auth, (req, res) => {
    res.send('Admin page!');
});

module.exports = router;