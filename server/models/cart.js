const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    createdBy: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Cart};