const {Cart} = require('../models/cart');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    try {
        const { createdBy, productId, quantity} = req.body;
        console.log(createdBy);
        console.log(productId);

        let pid=new mongoose.Types.ObjectId(productId);
        let uid=new mongoose.Types.ObjectId(createdBy);
        console.log(pid);
        console.log(uid);

        const cartItem = new Cart({ productId: pid, quantity, createdBy: uid });
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

        res.status(200).json(cartItems);
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

module.exports = {
    addToCart,
    queryCartOfUser,
    deleteProductFromCart
}