const {Cart} = require('../models/cart');
const {Order} = require('../models/order');

const createOrder = async (req, res) => {
    try {
        const { orderData } = req.body;

        const order = new Order(orderData);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const queryOrderOfUser = async (req, res) => {
    try {
        const { userID } = req.params;

        const orders = await Order.find({ createdBy: userID });
        if (!orders.length) {
            return res.status(404).json({ message: 'No order found' });
        }

        res.status(200).json({
            success: orders? true : false,
            orderData: orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const queryOrderById = async (req, res) => {
    try {
        const { orderID } = req.params;

        const order = await Order.findById(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: order? true : false,
            orderData: order
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelOrderById = async (req, res) => {
    try {
        const { orderID } = req.params;
        //sửa thành đã huỷ là được
        const order = await Order.findByIdAndUpdate(orderID, { status: 'Cancelled' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const { orderID } = req.params;

        const order = await Order.findByIdAndDelete(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    queryOrderOfUser,
    queryOrderById,
    cancelOrderById,
    deleteOrderById
}