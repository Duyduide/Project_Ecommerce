const mongoose = require('mongoose');
const { User } = require('./user');
const { Product } = require('./product');

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'Processing',
        enum: ['Processing', 'Paid', 'Delivering', 'Delivered', 'Cancelled']
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
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
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
    },
    payOSOrderId: {
        type: String,
        default: ''
    },
    productList: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
},{
    timestamps:true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = {Order};