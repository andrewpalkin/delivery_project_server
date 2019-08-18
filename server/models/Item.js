const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    status: {
        type: String,
        default: 'NEW',
        enum: ['NEW', 'ASSIGNED', 'CANCELED', 'DONE']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    handledBy: {
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
    },
    deadLineDate: {
        type: Date,
        default: new Date(Date.now() + 1000 /*seconds*/ * 60 /*minutes*/ * 60 /*hours*/ * 24 /*days*/ * 90)
    },
    pictureURL: [String]
    ,
    deliveryAddressID: {
        type: String,
        trim: true,
        required: true
    },
    pickUpAddressID: {
        type: String,
        trim: true,
        required: true
    },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;