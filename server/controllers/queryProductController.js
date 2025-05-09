const { Product, Phone, Laptop, Tablet, SmartWatch, PowerBank, Headphone, Charger, Case, Mouse, Keyboard } = require('../models/product');

const queryAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: products? true: false,
            productData: products? products: 'Cannot get products'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};


//tìm kiếm sản phẩm dựa vào loại sp và tìm theo trang, sau đó tuỳ chọn sắp xếp theo trường được chọn
const queryProductMain = async (req, res) => {
    try {
        const { category } = req.params;
        const { page, sortField, sortOrder, pageSize = 20 } = req.query;
        let sort = {};
        sort[sortField] = sortOrder === 'ascend' ? 1 : -1;
        if (category==='all') {
            const products = await Product.find().sort(sort).skip((page - 1) * pageSize).limit(pageSize);
            const totalProducts = await Product.countDocuments();
            res.status(200).json({
                success: products? true: false,
                totalProducts: totalProducts ? totalProducts : 0,
                productData: products? products: 'Cannot get products'
            });
        }
        else{
            const products = await Product.find({ __t: category }).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
            const totalProducts = await Product.countDocuments({ __t: category });
            res.status(200).json({
                success: products? true: false,
                totalProducts: totalProducts ? totalProducts : 0,
                productData: products? products: 'Cannot get products'
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryProductByName = async (req, res) => {
    try {
        const { productName } = req.params;
        if (!productName) {
            return res.status(400).json({ success: false, productData: 'Product name is required' });
        }

        const regex = new RegExp(productName, 'i'); // Case-insensitive search
        const products = await Product.find({ name: { $regex: regex } });

        // if (products.length > 0) {
        res.status(200).json({ success: true, productData: products });
        // } else {
        //     res.status(404).json({ success: false, productData: 'No products found with the given name' });
        // }
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

module.exports = { queryProductByName };

const queryProductByType = async (req, res) => {
    try {
        const { productType } = req.params;

        let products;
        switch (productType) {
            case 'phone':
                products = await Phone.find().sort({ createdAt: -1 });
                break;
            case 'laptop':
                products = await Laptop.find().sort({ createdAt: -1 });
                break;
            case 'tablet':
                products = await Tablet.find().sort({ createdAt: -1 });
                break;
            case 'smartwatch':
                products = await SmartWatch.find().sort({ createdAt: -1 });
                break;
            case 'powerbank':
                products = await PowerBank.find().sort({ createdAt: -1 });
                break;
            case 'headphone':
                products = await Headphone.find().sort({ createdAt: -1 });
                break;
            case 'charger':
                products = await Charger.find().sort({ createdAt: -1 });
                break;
            case 'case':
                products = await Case.find().sort({ createdAt: -1 });
                break;
            case 'mouse':
                products = await Mouse.find().sort({ createdAt: -1 });
                break;
            case 'keyboard':
                products = await Keyboard.find().sort({ createdAt: -1 });
                break;
            default:
                return res.status(400).json({success: false, message: 'Invalid product type'});
        }
        res.status(200).json({
            success: products? true: false,
            productData: products? products: 'Cannot get products'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryProductBySlug = async (req, res) => {
    try {
        const { productSlug } = req.params;

        const product = await Product.findOne({ slug: productSlug });
        if (!product) {
            return res.status(404).json({ success: false, productData: 'Product not found' });
        }

        res.status(200).json({
            success: product? true : false,
            productData: product? product : 'Cannot get product'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        
        res.status(200).json({
            success: product? true: false,
            productData: product? product: 'Cannot get products'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllPhones = async (req, res) => {
    try {
        const phones = await Phone.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: phones? true: false,
            productData: phones? phones: 'Cannot get phones'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: laptops? true: false,
            productData: laptops? laptops: 'Cannot get laptops'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllTablets = async (req, res) => {
    try {
        const tablets = await Tablet.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: tablets? true: false,
            productData: tablets? tablets: 'Cannot get tablets'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllSmartWatches = async (req, res) => {
    try {
        const smartWatches = await SmartWatch.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: smartWatches? true: false,
            productData: smartWatches? smartWatches: 'Cannot get smart watches'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllPowerBanks = async (req, res) => {
    try {
        const powerBanks = await PowerBank.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: powerBanks? true: false,
            productData: powerBanks? powerBanks: 'Cannot get power banks'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllHeadphones = async (req, res) => {
    try {
        const headphones = await Headphone.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: headphones? true: false,
            productData: headphones? headphones: 'Cannot get headphones'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllChargers = async (req, res) => {
    try {
        const chargers = await Charger.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: chargers? true: false,
            productData: chargers? chargers: 'Cannot get chargers'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllCases = async (req, res) => {
    try {
        const cases = await Case.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: cases? true: false,
            productData: cases? cases: 'Cannot get cases'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllMice = async (req, res) => {
    try {
        const mice = await Mouse.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: mice? true: false,
            productData: mice? mice: 'Cannot get mice'
    });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryAllKeyboards = async (req, res) => {
    try {
        const keyboards = await Keyboard.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: keyboards? true: false,
            productData: keyboards? keyboards: 'Cannot get keyboards'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const queryProductByManufacturer = async (req, res) => {
    try {
        const { manufacturer } = req.params;

        const products = await Product.find({ manufacturer });

        res.status(200).json({
            success: products? true : false,
            productData: products? products : 'Cannot get products'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

const filterProducts = async (req, res) => {
    try {
        const { filterData } = req.body;

        const products = await Product.find(filterData);

        res.status(200).json({
            success: products? true : false,
            productData: products? products : 'Cannot get products'
        });
    } catch (error) {
        res.status(500).json({ success: false, productData: error.message });
    }
};

module.exports = {
    queryAllProducts,
    queryProductById,
    queryAllPhones,
    queryAllLaptops,
    queryAllTablets,
    queryAllSmartWatches,
    queryAllPowerBanks,
    queryAllHeadphones,
    queryAllChargers,
    queryAllCases,
    queryAllMice,
    queryAllKeyboards,
    queryProductByType,
    queryProductByManufacturer,
    filterProducts,
    queryProductBySlug,
    queryProductMain,
    queryProductByName
}