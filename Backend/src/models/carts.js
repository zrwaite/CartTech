const mongoose = require('mongoose');
//user schema that defines the entity
const cartsSchema = new mongoose.Schema({
    // define type, required (the most important)
    store_id: {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Unavailable"
    },
    
}, { timestamps: true});

module.exports = mongoose.model('Carts', cartsSchema); //Export data formatting