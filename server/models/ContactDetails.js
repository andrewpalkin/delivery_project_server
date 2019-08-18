const mongoose = require('mongoose');

const ContactDetailsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    preferredTime: [Number]
    ,
    preferredDays: [Number]
    ,
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

const ContactDetails = mongoose.model('ContactDetails', ContactDetailsSchema);

module.exports = ContactDetails;