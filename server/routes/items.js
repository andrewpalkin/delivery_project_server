const express = require('express');
const router = express.Router();
const auth = require('../utils/authentication');

//UserDetails Model
const Item = require('../models/Item');

router.post('/item', auth, (req, res) => {

    const newItem = new Item(req.body);
    let errors = newItem.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        // Validation passed
        res.json({
            id: '1234567test'
        });
    }
});

router.get('/item', auth, (req, res) => {
    console.log(req.query.id);

    Item.findById( req.query.id)
        .then(item => {
            if (item) {
                res.json({
                    createDate: item.createDate,
                    updateDate: item.updateDate,
                    id: item._id,
                    name: item.name,
                    status: item.status,
                    description: item.description,
                    createdBy: item.createdBy,
                    handledBy: item.handledBy,
                    deadLineDate: item.deadLineDate,
                    pictureURL: item.pictureURL,
                    deliveryAddressID: item.deliveryAddressID,
                    pickUpAddressID: item.pickUpAddressID
                })
            } else {
                // User Exists
                console.log('The item with this ID number not exist');
                res.status(500).send({msg: 'The item with this ID number not exist'});
            }
        })
        .catch(err => console.log(err));
});

router.get('/admin', auth, (req, res) => {
    res.send('Admin page!');
});

module.exports = router;