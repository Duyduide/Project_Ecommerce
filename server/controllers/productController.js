const { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard } = require('../models/product');
const { Cart } = require('./cart');
const { Voucher } = require('../models/voucher');
const { Order } = require('../models/order');
const { User } = require('../models/user');

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

const deleteProductById = async (req, res) => {
    try {
        const { userID, productType, productID } = req.body;
        
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

        const product = await productModel.findByIdAndDelete(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
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

// const updateProductByID = async (req, res) => {
//     try {
//         const { userID, name, updateData } = req.body;

//         // Verify if the user is an admin
//         const user = await User.findById(userID);
//         if (!user || !user.isAdmin) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         const product = await Product.findOneAndUpdate({ name: name }, updateData, { new: true });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const updateProductByID = async (req, res) => {
    try {
        const { userID, productType, productID, updateData } = req.body;

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

        const product = await productModel.findByIdAndUpdate(productID, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createProduct, deleteProductByName, 
    updateProductByID, deleteProductById };
