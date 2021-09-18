const mongoose = require('mongoose');
//user schema that defines the entity
const productsSchema = new mongoose.Schema({
    // define type, required (the most important)
    name: {
        type: String,
        required: true,
    },
    store_id: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: null,
    },
    image_link: {
        type: String,
        required: false,
        default: null
    }
}, { timestamps: true});

module.exports = mongoose.model('Products', productsSchema); //Export data formatting