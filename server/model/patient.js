const mongoose = require('mongoose');
const ownerSchema = require('./owner.js');

const patientSchema = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    owners: [ownerSchema],
    isBloodDonor: {type: Boolean},
    bloodType: {type: String},
    practiceid: {type: String}
});

module.exports = PatientModel = mongoose.model('Patient', patientSchema);