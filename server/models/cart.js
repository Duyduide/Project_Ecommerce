const mongoose = require('mongoose');
const { User } = require('./user');
const { Product } = require('./product');

const cartSchema = new mongoose.Schema({
    // productId: {
    //     type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    //     // required: true
    // },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    // createdBy: {
    //     type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     // required: true
    // }
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Cart};