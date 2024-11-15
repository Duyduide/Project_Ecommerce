const router = require('express').Router();
const queryProductController = require('../controllers/queryProductController');

router.get('/getAllProduct', queryProductController.queryAllProducts);
router.get('/getProductById/:productID', queryProductController.queryProductByID);
router.get('/getProductByType', queryProductController.queryProductByType);
router.get('/getProductByManufacturer', queryProductController.queryProductByManufacturer);
//
router.get('/getProductBySlug/:productSlug', queryProductController.queryProductBySlug);
//
router.get('/getProductMain/:category', queryProductController.queryProductMain);
//get từng loại sản phẩm
router.get('/getPhone', queryProductController.queryAllPhones);
router.get('/getLaptop', queryProductController.queryAllLaptops);
router.get('/getSmartWatch', queryProductController.queryAllSmartWatches);
router.get('/getTablet', queryProductController.queryAllTablets);
router.get('/getPowerBank', queryProductController.queryAllPowerBanks);
router.get('/getHeadphone', queryProductController.queryAllHeadphones);
router.get('/getCharger', queryProductController.queryAllChargers);
router.get('/getMouse', queryProductController.queryAllMice);
router.get('/getKeyboard', queryProductController.queryAllKeyboards);

// router.get('/getProductByPrice', queryProductController.queryProductByPrice);
router.get('/filterProduct', queryProductController.filterProducts);

router.get('/getPhone', queryProductController.queryAllPhones);
router.get('/getLaptop', queryProductController.queryAllLaptops);
router.get('/getTablet', queryProductController.queryAllTablets);
router.get('/getHeadphone', queryProductController.queryAllHeadphones);

module.exports = router;