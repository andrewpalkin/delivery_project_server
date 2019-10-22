const express = require('express');
const router = express.Router();
const auth = require('../utils/authentication');

//UserDetails Model
const Item = require('../models/Item');

function buildOutputJSON(item) {
    return {
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
    };
}

function buildOutputArray(items, res) {
    let itemMap = {};

    items.forEach(function (item) {
        itemMap[item._id] = buildOutputJSON(item);
    });

    res.json(itemMap);
}

router.post('/create', auth, (req, res) => {

    const newItem = new Item(req.body);
    let errors = newItem.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        newItem.status = 'NEW';
        newItem.save()
            .then(item => res.json(buildOutputJSON(item)))
            .catch(err => console.log(err));
    }
});

router.post('/update', auth, (req, res) => {
    console.log(req.query.id);

    const newItem = new Item(req.body);
    let errors = newItem.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
            Item.findById(req.query.id)
                .then(item => {
                    if (item) {
                        item.updateDate = Date.now();
                        item.name = newItem.name;
                        item.description = newItem.description;
                        item.handledBy = newItem.handledBy;
                        item.deadLineDate = newItem.deadLineDate;
                        item.pictureURL = newItem.pictureURL;
                        item.deliveryAddressID = newItem.deliveryAddressID;
                        item.pickUpAddressID = newItem.pickUpAddressID;
                        item.status = newItem.status;

                        item.save()
                            .then(item => res.json(buildOutputJSON(item)))
                            .catch(err => console.log(err));
                    } else {
                        // User Exists
                        console.log('The item with this ID number not exist');
                        res.status(500).send({msg: 'The item with this ID number not exist'});
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log('The id that was provided not valid');
            res.status(422).send({msg: 'The id that was provided not valid'});
        }
    }
});

router.get('/item', auth, (req, res) => {
    console.log(req.query.id);

    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        Item.findById(req.query.id)
            .then(item => {
                if (item) {
                    res.json(buildOutputJSON(item))
                } else {
                    // User Exists
                    console.log('The item with this ID number not exist');
                    res.status(500).send({msg: 'The item with this ID number not exist'});
                }
            })
            .catch(err => console.log(err));
    } else {
        console.log('The id that was provided not valid');
        res.status(422).send({msg: 'The id that was provided not valid'});
    }
});

router.get('/createdBy', auth, (req, res) => {
    console.log(req.query.id);

    Item.find({createdBy: req.query.id}, function (err, items) {
        buildOutputArray(items, res);
    });
});

router.get('/handledBy', auth, (req, res) => {
    console.log(req.query.id);

    Item.find({handledBy: req.query.id}, function (err, items) {
        buildOutputArray(items, res);
    });
});

module.exports = router;