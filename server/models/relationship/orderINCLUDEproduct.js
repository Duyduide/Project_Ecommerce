const mongoose = require('mongoose');

const orderINCLUDEproductSchema = new mongoose.Schema({
    orderId: {
        type: Schema.Types.ObjectId, 
        ref: 'Order',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId, 
        ref: 'Product' ,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const OrderINCLUDEproduct = mongoose.model('OrderINCLUDEproduct', orderINCLUDEproductSchema);

module.exports = {OrderINCLUDEproduct};