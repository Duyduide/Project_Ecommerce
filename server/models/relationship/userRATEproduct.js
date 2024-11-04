const mongoose = require('mongoose');

const userRATEproductSchema = new mongoose.Schema({
    userId: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    },
    productId: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
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

const UserRATEproduct = mongoose.model('UserRATEproduct', userRATEproductSchema);

module.exports = {UserRATEproduct};