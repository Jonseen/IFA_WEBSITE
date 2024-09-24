const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: Buffer, // Store image data as a Buffer
        contentType: String // Optional: Store image content type (e.g., "image/jpeg")
    }
})

module.exports = mongoose.model('Post', PostSchema);