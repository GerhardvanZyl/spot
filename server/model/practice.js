const patientSchema = require('./patient.js');
const contactInfoSchema = require('./contact-info.js');
const addressSchema = require('./address.js');
const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto:true },
    name: { type: String },
    emailAddresses: [{type:String}],
    phoneNumbers: [{type:String}],
    address: { type: addressSchema }
});

module.exports = mongoose.model('Practice', practiceSchema);
