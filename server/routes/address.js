const express = require('express');
const router = express.Router();
const auth = require('../utils/authentication');

//Address Model
const Address = require('../models/Address');

function buildOutputJSON(item) {
    return {
        type: item.type,
        country: item.country,
        id: item._id,
        city: item.city,
        street: item.street,
        houseNumber: item.houseNumber,
        zipCode: item.zipCode,
        googleMapCoordinate: item.googleMapCoordinate,
        pictureURL: item.pictureURL,
        createDate: item.createDate,
        updateDate: item.updateDate
    };
}

router.post('/create', auth, (req, res) => {

    const newAddress = new Address(req.body);
    let errors = newAddress.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        newAddress.save()
            .then(item => res.json(buildOutputJSON(item)))
            .catch(err => console.log(err));
    }
});

router.post('/update', auth, (req, res) => {
    console.log(req.query.id);

    const newAddress = new Address(req.body);
    let errors = newAddress.validateSync();

    if (errors) {
        res.status(500).send({name: errors.name, msg: errors.message});
    } else {
        if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
            Address.findById(req.query.id)
                .then(address => {
                    if (address) {
                        address.type = newAddress.type;
                        address.city = newAddress.city;
                        address.pictureURL = newAddress.pictureURL;
                        address.updateDate = Date.now();
                        address.zipCode = newAddress.zipCode;
                        address.googleMapCoordinate = newAddress.googleMapCoordinate;
                        address.houseNumber = newAddress.houseNumber;
                        address.street = newAddress.street;

                        address.save()
                            .then(address => res.json(buildOutputJSON(address)))
                            .catch(err => console.log(err));
                    } else {
                        // User Exists
                        console.log('The address with this ID number not exist');
                        res.status(500).send({msg: 'The address with this ID number not exist'});
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log('The id that was provided not valid');
            res.status(422).send({msg: 'The id that was provided not valid'});
        }
    }
});

router.get('/address', auth, (req, res) => {
    console.log(req.query.id);

    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        Address.findById(req.query.id)
            .then(address => {
                if (address) {
                    res.json(buildOutputJSON(address))
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

module.exports = router;