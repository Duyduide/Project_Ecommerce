const {Order} = require('../models/order');

const createOrder = async (req, res) => {
    try {
        const { orderData } = req.body;

        const order = new Order(orderData);
        await order.save();
        res.status(201).json({
            success: order? true : false,
            orderData: order? order : 'Cannot create order'
        });
    } catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
}

const queryOrderOfUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ createdBy: userId });

        res.status(200).json({
            success: orders? true : false,
            orderData: orders? orders : 'Cannot get order'
        });
    } catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
}

const queryOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        res.status(200).json({
            success: order? true : false,
            orderData: order? order : 'Cannot get order'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
};

const cancelOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        //sửa thành đã huỷ là được
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });
        if (!order) {
            return res.status(404).json({ success: false,  orderData: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            orderData: 'Order cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ success: false,  orderData: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            orderData: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
}

module.exports = {
    createOrder,
    queryOrderOfUser,
    queryOrderById,
    cancelOrderById,
    deleteOrderById
}