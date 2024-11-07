const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    voucherUsed:{
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = {Order};