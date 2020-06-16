const patientSchema = require('./patient.js');
const contactInfoSchema = require('./contact-info.js');
const addressSchema = require('./address.js');
const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto:true },
    name: { type: String },
    emailAddresses: [contactInfoSchema],
    phoneNumbers: [contactInfoSchema],
    address: { type: addressSchema }
});

module.exports = PracticeModel = mongoose.model('Practice', practiceSchema);