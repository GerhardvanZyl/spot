const patientSchema = require('./patient.js');
const contactInfoSchema = require('./contact-info.js');
const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    practiceName: {type: String},
    emailAddresses: [contactInfoSchema],
    phoneNumbers: [contactInfoSchema],
    address: {type: contactInfoSchema}
});

module.exports = PracticeModel = mongoose.model('Practice', practiceSchema);