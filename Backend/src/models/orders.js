const mongoose = require('mongoose');
//user schema that defines the entity
const listedProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
});
const ordersSchema = new mongoose.Schema({
    // define type, required (the most important)
    store_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: null,
    },
    taxed_price: {
        type: Number,
        required: true,
        default: null,
    },
    products: [listedProductSchema],
    status: {
        type: String,
        required: false,
        default: "Waiting"
    },
}, { timestamps: true});

module.exports = mongoose.model('Orders', ordersSchema); //Export data formatting