const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    secondName: {
        type: String,
        required: true,
        trim: true
    },
    addressID: {
        type: String,
        trim: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;