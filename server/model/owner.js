const mongoose = require('mongoose');
const contactInfoSchema = require('./contact-info.js');

module.exports = ownerSchema = new mongoose.Schema({
    firstName: {type: String},
    surname: {type: String},
    phoneNumbers: [contactInfoSchema],
    emailAddresses: [contactInfoSchema],
    address: [contactInfoSchema]
});