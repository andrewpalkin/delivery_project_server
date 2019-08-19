const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['DELIVERY', 'CUSTOMER', 'BILLING', 'PICKUP']
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    houseNumber: {
        type: Number,
        required: true
    },
    zipCode: {
        type: Number
    },
    googleMapCoordinate: {
        type: String,
        trim: true
    },
    pictureURL: [String]
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

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;