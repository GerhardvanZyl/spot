const mongoose = require('mongoose');

module.exports = contactInfoSchema = mongoose.Schema({
    value: {type: String},
    isDefault: {type:Boolean},
    contactInfoType: {type: String}
});