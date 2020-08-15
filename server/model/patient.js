const mongoose = require('mongoose');
const ownerSchema = require('./owner.js');

const patientSchema = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    owners: [ownerSchema],
    isBloodDonor: {type: Boolean},
    bloodType: {type: String},
    practiceId: {type: String},
    lastBloodDonation: {type: Date}
});

module.exports = PatientModel = mongoose.model('Patient', patientSchema);