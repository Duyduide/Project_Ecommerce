const { CustomerMessage, AdminMessage } = require('../models/message');

// const createMessage = async (req, res) => {
//     try {
//         const { messageData } = req.body;

//         if ((messageData.senderRole === 'admin'&& messageData.receiverRole === 'user')||(messageData.senderRole === 'user'&& messageData.receiverRole === 'admin')) {
//             res.status(400).json({ success: false, messageData: 'Invalid sender and receiver' });
//         }

//         const message = new Message(messageData);
//         await message.save();
//         res.status(201).json({
//             success: message? true : false,
//             messageData: message? message : 'Cannot create message'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, messageData: error.message });
//     }
// };

const customerSendMessage = async (req, res) => {
    try {
        const { messageData } = req.body;

        const message = new CustomerMessage(messageData);
        await message.save();
        res.status(201).json({
            success: message? true : false,
            messageData: message? message : 'Cannot create message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
}

const adminSendMessage = async (req, res) => {
    try {
        const { messageData } = req.body;

        const message = new AdminMessage(messageData);
        await message.save();
        res.status(201).json({
            success: message? true : false,
            messageData: message? message : 'Cannot create message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
}

const queryAllMessageOfCustomer = async (req, res) => {
    const { userId } = req.params;

    const userMessage=await CustomerMessage.find({customerId:userId});
    const adminMessage=await AdminMessage.find({customerId:userId});

    res.status(200).json({
        success: userMessage&&adminMessage ? true : false,
        userMessageData: userMessage? userMessage : 'Cannot get user message',
        adminMessageData: adminMessage? adminMessage : 'Cannot get admin message'
    });
};

// const queryCustomerLatestMessage = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const messages = await CustomerMessage.find({ customerId: userId }).sort({ createdAt: -1 }).limit(1);

//         if (messages.length === 0) {
//             res.status(404).json({ success: false, messageData: 'No message was found' });
//         }

//         res.status(200).json({
//             success: messages? true : false,
//             messageData: messages? messages : 'Cannot get message'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, messageData: error.message });
//     }
// };

const updateAdminNewReplies = async (req, res) => {
    try {
        const { customerId, updatedAt } = req.params;

        const messages = await AdminMessage.find({ customerId, updatedAt: {$gte : updatedAt } }).sort({ createdAt: -1 }).limit(1);

        if (messages.length === 0) {
            res.status(404).json({ success: false, messageData: 'No new message' });
        }

        res.status(200).json({
            success: messages? true : false,
            messageData: messages? messages : 'Cannot get message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

const updateCustomerNewReplies = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await CustomerMessage.find({ customerId: userId }).sort({ createdAt: -1 }).limit(1);

        if (messages.length === 0) {
            res.status(404).json({ success: false, messageData: 'No message was found' });
        }

        res.status(200).json({
            success: messages? true : false,
            messageData: messages? messages : 'Cannot get message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

// const queryAllCustomerWhoSentMessage = async (req, res) => {
//     try {
//         const users = await CustomerMessage.find().distinct('customerId');
//         res.status(200).json({
//             success: users? true : false,
//             userData: users? users : 'Cannot get user'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, userData: error.message });
//     }
// };

const queryAllCustomerWhoSendMessageAndTheirLatestMessage = async (req, res) => {
    try {
        const users = await CustomerMessage.find().distinct('customerId');
        const latestMessages = await Promise.all(users.map(async (userId) => {
            const messages = await CustomerMessage.find({ customerId: userId }).sort({ createdAt: -1 }).limit(1);
            return messages[0];
        }));
        res.status(200).json({
            success: latestMessages? true : false,
            messageData: latestMessages? latestMessages : 'Cannot get message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};


// const queryUserToAdminMessage = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const messages = await CustomerMessage.find({ customerId: userId });
//         res.status(200).json({
//             success: messages? true : false,
//             messageData: messages? messages : 'Cannot get message'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, messageData: error.message });
//     }
// };

// const queryAdminToUserMessage = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const messages = await AdminMessage.find({ customerId: userId });
//         res.status(200).json({
//             success: messages? true : false,
//             messageData: messages? messages : 'Cannot get message'
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, messageData: error.message });
//     }
// };

const queryAdminMessage = async(req,res)=>{
    try {
        const { userId } = req.params;

        const messages = await AdminMessage.find({ adminId: userId });
        res.status(200).json({
            success: messages? true : false,
            messageData: messages? messages : 'Cannot get message'
        });
    } catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
}

const updateCustomerMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { messageData } = req.body;

        const message = await CustomerMessage.findByIdAndUpdate(messageId, messageData, { new: true });
        res.status(200).json({
            success: message? true : false,
            messageData: message? message : 'Cannot update message'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

const changeAdminMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { messageData } = req.body;

        const message = await AdminMessage.findByIdAndUpdate(messageId, messageData, { new: true });
        res.status(200).json({
            success: message? true : false,
            messageData: message? message : 'Cannot update message'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

const deleteCustomerMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await CustomerMessage.findByIdAndDelete(messageId);
        res.status(200).json({
            success: message? true : false,
            messageData: message? message : 'Cannot delete message'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

const deleteAdminMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await AdminMessage.findByIdAndDelete(messageId);
        res.status(200).json({
            success: message? true : false,
            messageData: message? message : 'Cannot delete message'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, messageData: error.message });
    }
};

