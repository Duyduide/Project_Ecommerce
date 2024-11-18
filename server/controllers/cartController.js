const { Cart } = require('../models/cart');
const mongoose = require('mongoose');
const User = require('../models/user');

// const addToCart = async (req, res) => {
//     try {
//         const { createdBy, productId, quantity} = req.body;

//         const cartItem = new Cart({ productId, quantity, createdBy });
//         await cartItem.save();
//         res.status(201).json(cartItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const addToUserCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        // for (let i=0; i<quantity; i++) {
        //     user.cart.push( productId );
        // }
        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push( productId );
        }

        await user.save();
        res.status(201).json({
            success: user.cart? true : false,
            cartData: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeUserCartProductQuantity = async (req, res) => {
    try {
        const { userID, productId, isIncrease, changeQuantity = 0 } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        // if(!changeQuantity) {
        //     if (isIncrease) {
        //         user.cart.push( productId );
        //     }
        //     else {
        //         const cartItemIndex = user.cart.findIndex(item => item.toString() === productId);
        //         if (cartItemIndex > -1) {
        //             user.cart.splice(cartItemIndex, 1);
        //         }
        //     }
        // }
        // else{
        //     let currentQuantity = 0;
        //     for (let i=0; i<user.cart.length; i++) {
        //         if(user.cart[i].toString() === productId) {
        //             currentQuantity++;
        //         }
        //     }

        //     if (currentQuantity<changeQuantity) {
        //         for (let i=0; i<changeQuantity-currentQuantity; i++) {
        //             user.cart.push( productId );
        //         }
        //     }
        //     else if (currentQuantity>changeQuantity) {
        //         for (let i=0; i<currentQuantity-changeQuantity; i++) {
        //             const cartItemIndex = user.cart.findIndex(item => item.toString() === productId);
        //             if (cartItemIndex > -1) {
        //                 user.cart.splice(cartItemIndex, 1);
        //             }
        //             else break;
        //         }
        //     }
        // }

        //xem

        await user.save();
        res.status(200).json({
            success: user.cart? true : false,
            cartData: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const changeCartProductQuantity = async (req, res) => {
//     try {
//         const { createdBy, productId, quantity } = req.body;

//         const cartItem = await Cart.findOne ({ productId, createdBy });
//         if (!cartItem) {
//             return res.status(404).json({ message: 'Product not found in cart' });
//         }

//         cartItem.quantity = quantity;
//         await cartItem.save();
//         res.status(200).json(cartItem);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const queryCartOfUser = async (req, res) => {
//     try {
//         const { userID } = req.params;

//         const cartItems = await Cart.find({ createdBy: userID }).populate('productId');
//         if (!cartItems.length) {
//             return res.status(404).json({ message: 'Cart is empty' });
//         }

//         res.status(200).json(cartItems);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const queryUserCart = async (req, res) => {
    try {
        const { userID } = req.params;

        const user = await User.findById(userID).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.cart.length) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json({
            success: user.cart? true : false,
            cartData: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const deleteProductFromCart = async (req, res) => {
//     try {
//         const { userID, productID } = req.body;

//         const cartItem = await Cart.findOneAndDelete({ productId: productID, createdBy: userID });
//         if (!cartItem) {
//             return res.status(404).json({ message: 'Product not found in cart' });
//         }

//         res.status(200).json({ message: 'Product removed from cart successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const deleteProductFromUserCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const cartItemIndex = user.cart.findIndex(item => item.toString() === productId);
        // if (cartItemIndex > -1) {
        //     user.cart.splice(cartItemIndex, 1);
        // } else {
        //     return res.status(404).json({ message: 'Product not found in cart' });
        // }
        user.cart=user.cart.filter(item => item.toString() !== productId);

        await user.save();
        res.status(200).json({
            success: user.cart? true : false,
            cartData: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllProductsFromUserCart = async (req, res) => {
    try {
        const { userID } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];
        await user.save();
        res.status(200).json({ message: 'All products removed from cart successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addToUserCart,
    queryUserCart,
    deleteProductFromUserCart,
    changeUserCartProductQuantity,
    deleteAllProductsFromUserCart
}