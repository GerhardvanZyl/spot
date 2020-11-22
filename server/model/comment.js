const mongoose = require('mongoose');

module.exports = commentSchema = new mongoose.Schema({
    content: {type: String}
});