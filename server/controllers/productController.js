const { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard } = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { productType, productData } = req.body;

        let product;
        switch (productType) {
            case 'phone':
                product = new Phone(productData);
                break;
            case 'laptop':
                product = new Laptop(productData);
                break;
            case 'tablet':
                product = new Tablet(productData);
                break;
            case 'smartwatch':
                product = new SmartWatch(productData);
                break;
            case 'powerbank':
                product = new PowerBank(productData);
                break;
            case 'headphone':
                product = new Headphone(productData);
                break;
            case 'charger':
                product = new Charger(productData);
                break;
            case 'case':
                product = new Case(productData);
                break;
            case 'mouse':
                product = new Mouse(productData);
                break;
            case 'keyboard':
                product = new Keyboard(productData);
                break;
            default:
                return res.status(400).json({ message: 'Invalid product type' });
        }

        await product.save();
        res.status(201).json({success: product ? true : false, productData: product ? product : 'Cannot create product'});
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ success: false, productData: 'Product not found' });
        }

        res.status(200).json({ success: true, productData: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};


// const deleteProductByName = async (req, res) => {
//     try {
//         const { productName } = req.params;

//         const result = await Product.deleteMany({ name: productName });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateProductById = async (req, res) => {
//     try {
//         const { userId, name, updateData } = req.body;

//         // Verify if the user is an admin
//         const user = await User.findById(userId);
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

const updateProductById = async (req, res) => {
    try {
        const { productId, updateData } = req.body;

        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, productData: 'Product not found' });
        }
        res.status(200).json({ success: true, productData: product? product : 'Cannot update product' });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
}

module.exports = { createProduct, updateProductById, deleteProductById };
