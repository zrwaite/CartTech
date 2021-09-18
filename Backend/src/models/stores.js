const mongoose = require('mongoose');
//user schema that defines the entity
const storesSchema = new mongoose.Schema({
    // define type, required (the most important)
    name: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: false,
        default: "",
    },
    total_carts: {
        type: Number,
        required: false,
        default: 0,
    },
    available_carts: {
        type: Number,
        required: false,
        default: 0,
    },
    image_link: {
        type: String,
        required: false,
        default: null
    }
}, { timestamps: true});

module.exports = mongoose.model('Stores', storesSchema); //Export data formatting