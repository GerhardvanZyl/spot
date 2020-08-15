const addressSchema = require('./address.js');
const mongoose = require('mongoose');
const contactInfoSchema = require('./contact-info.js');

module.exports = ownerSchema = new mongoose.Schema({
    firstName: {type: String},
    surname: {type: String},
    phoneNumbers: [{type:String}],
    emailAddresses: [{type:String}],
    address: { type: addressSchema }
});