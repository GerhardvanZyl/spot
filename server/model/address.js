const mongoose = require('mongoose');

module.exports = addressSchema = new mongoose.Schema({
    line1: {type: String},
    line2: {type: String},
    suburb: {type: String},
    city: {type: String},
    province: {type:String},
    postalCode: {type: String}
});