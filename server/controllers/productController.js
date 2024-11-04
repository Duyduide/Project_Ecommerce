const { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard } = require('../models/product');
const { Cart } = require('./cart');

const createProduct = async (req, res) => {
    try {
        const { userID, productType, productData } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        let product;
        switch (productType) {
            case 'Phone':
                product = new Phone(productData);
                break;
            case 'Laptop':
                product = new Laptop(productData);
                break;
            case 'Tablet':
                product = new Tablet(productData);
                break;
            case 'SmartWatch':
                product = new SmartWatch(productData);
                break;
            case 'PowerBank':
                product = new PowerBank(productData);
                break;
            case 'Headphone':
                product = new Headphone(productData);
                break;
            case 'Charger':
                product = new Charger(productData);
                break;
            case 'Case':
                product = new Case(productData);
                break;
            case 'Mouse':
                product = new Mouse(productData);
                break;
            case 'Keyboard':
                product = new Keyboard(productData);
                break;
            default:
                return res.status(400).json({ message: 'Invalid product type' });
        }

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProductByName = async (req, res) => {
    try {
        const { userID, productType, productName } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        let productModel;
        switch (productType) {
            case 'Phone':
                productModel = Phone;
                break;
            case 'Laptop':
                productModel = Laptop;
                break;
            case 'Tablet':
                productModel = Tablet;
                break;
            case 'SmartWatch':
                productModel = SmartWatch;
                break;
            case 'PowerBank':
                productModel = PowerBank;
                break;
            case 'Headphone':
                productModel = Headphone;
                break;
            case 'Charger':
                productModel = Charger;
                break;
            case 'Case':
                productModel = Case;
                break;
            case 'Mouse':
                productModel = Mouse;
                break;
            case 'Keyboard':
                productModel = Keyboard;
                break;
            default:
                return res.status(400).json({ message: 'Invalid product type' });
        }

        const result = await productModel.deleteMany({ name: productName });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { userID, name, updateData } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const product = await Product.findOneAndUpdate({ name: name }, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVoucher = async (req, res) => {
    try {
        const { userID, voucherData } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const voucher = new Voucher(voucherData);
        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        const { userID, voucherID } = req.body;

        // Verify if the user is an admin
        const user = await User.findById(userID);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const voucher = await Voucher.findOneAndDelete({ voucherID });
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.status(200).json({ message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const queryAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const queryProductByID = async (req, res) => {
    try {
        const { productID } = req.params;

        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart=  async (req, res) => {
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

module.exports = { createProduct, deleteProductByName, createVoucher, updateProduct, deleteVoucher, queryAllProducts, queryProductByID, queryCartOfUser, addToCart };
