const mongoose = require('mongoose');
const ownerSchema = require('./owner.js');
const commentSchema = require('./comment.js');

const patientSchema = new mongoose.Schema({
    name: {type: String},
    surname: {type: String},
    owners: [ownerSchema],
    isBloodDonor: {type: Boolean},
    bloodType: {type: String},
    practiceId: {type: String},
    lastBloodDonationDate: {type: Date},
    comments: [commentSchema]
});

module.exports = mongoose.model('Patient', patientSchema);