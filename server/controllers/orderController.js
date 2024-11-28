const {Order} = require('../models/order');
const {Product} = require('../models/product');

const createOrder = async (req, res) => {
    try {
        const { orderData } = req.body;

        const order = new Order(orderData);
        for (let item of order.productList) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }
        await order.save();
        res.status(201).json({
            success: order? true : false,
            orderData: order? order : 'Cannot create order'
        });
    } catch (error) {
        res.status(500).json({ success: false, orderData: error.message });
    }
};

const queryAllOrders = async (req, res) => {
    try {
        const { page, limit, sortField, sortOrder } = req.query;

        let sort = {};
        sort[sortField] = sortOrder === 'ascend' ? 1 : -1;

        const orders = await Order.find().sort(sort).limit(limit * 1).skip((page - 1) * limit);

        res.status(200).json({
            success: orders? true : false,
            orderData: orders? orders : 'Cannot get order'
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

const updateOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderData } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, orderData, { new: true });

        res.status(200).json({
            success: order? true : false,
            orderData: order? order : 'Cannot update order'
        });
    } catch (error) {
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
        for (let item of order.productList) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
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
    queryAllOrders,
    queryOrderOfUser,
    queryOrderById,
    cancelOrderById,
    deleteOrderById,
    updateOrderById
}