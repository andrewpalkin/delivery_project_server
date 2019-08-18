const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send({msg: 'You are not authenticated–either not authenticated at all or authenticated incorrectly–but please reauthenticate and try again.'});
    }
};

module.exports = auth;