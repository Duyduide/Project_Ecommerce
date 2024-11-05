const Cart = require('../models/cart');
const Order = require('../models/order');

const addToCart = async (req, res) => {
    try {
        const { userID, productID, quantity } = req.body;

        const cartItem = new Cart({ productId: productID, quantity, createdBy: userID });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const queryCartOfUser = async (req, res) => {
    try {
        const { userID } = req.params;

        const cartItems = await Cart.find({ createdBy: userID }).populate('productId');
        if (!cartItems.length) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json({cartItems});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductFromCart = async (req, res) => {
    try {
        const { userID, productID } = req.body;

        const cartItem = await Cart.findOneAndDelete({ productId: productID, createdBy: userID });
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

module.exports = {
    addToCart,
    queryCartOfUser,
    createOrder
}