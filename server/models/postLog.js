const mongoose = require('mongoose');

const postLogSchema = new mongoose.Schema({
    postedBy: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
        required: true
    },
    productPosted: {
        type: { type: Schema.Types.ObjectId, ref: 'Product' },
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const PostLog = mongoose.model('PostLog', postLogSchema);

module.exports = {PostLog};