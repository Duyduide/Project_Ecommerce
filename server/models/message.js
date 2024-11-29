const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' ,
//         required: true
//     },
//     senderRole: {
//         type: String,
//         required: true,
//         trim: true,
//         enum: ['admin', 'user']
//     },
//     senderName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' ,
//         required: true
//     },
//     receiverRole: {
//         type: String,
//         required: true,
//         trim: true,
//         enum: ['admin', 'user']
//     },
//     receiverName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     message: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     status: {
//         type: String,
//         required: true,
//         trim: true,
//         default: 'Unread',
//         enum: ['Unread', 'Read']
//     }
// }, { 
//     timestamps: true 
// });

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