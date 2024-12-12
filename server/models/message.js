const mongoose = require('mongoose');

const customerMessageSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const adminMessageSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true
    }
}, {
    timestamps: true
});

const CustomerMessage = mongoose.model('CustomerMessage', customerMessageSchema);   
const AdminMessage = mongoose.model('AdminMessage', adminMessageSchema);

module.exports = { CustomerMessage, AdminMessage };