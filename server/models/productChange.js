const mongoose = require('mongoose');

const productChangeSchema = new mongoose.Schema({
    productId: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    }
});

const ProductChange = mongoose.model('ProductChange', productChangeSchema);

module.exports = {ProductChange};