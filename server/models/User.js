const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, required: true,
        trim: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true
    },
    verification: {
        type: String,
        default: 'SEND',
        enum: ['SEND', 'DONE']
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    verificationString:{
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;