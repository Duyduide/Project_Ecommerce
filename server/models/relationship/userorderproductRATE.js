const mongoose = require('mongoose');

const userorderproductRATE = new mongoose.Schema({
    userId: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    },
    productId: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    orderId: {
        type: { type: Schema.Types.ObjectId, ref: 'Order' },
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    ratedAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: String,
        required: true,
        trim: true
    }
}); 

const UserorderproductRATE = mongoose.model('UserRATEproduct', userorderproductRATE);

module.exports = {userorderproductRATE};