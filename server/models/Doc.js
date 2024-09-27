const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    documentDoc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Doc', DocSchema);