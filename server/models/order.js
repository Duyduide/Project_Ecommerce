const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    paymentStatus: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    voucherUsed:{
        type: { type: Schema.Types.ObjectId, ref: 'Voucher' },
        required: true
    },
    createdBy: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = {Order};