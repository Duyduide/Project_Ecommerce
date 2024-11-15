const router = require('express').Router();
const queryProductController = require('../controllers/queryProductController');

router.get('/getAllProduct', queryProductController.queryAllProducts);
router.get('/getProductById/:productID', queryProductController.queryProductByID);
router.get('/getProductByType', queryProductController.queryProductByType);
router.get('/getProductByManufacturer', queryProductController.queryProductByManufacturer);
// router.get('/getProductByPrice', queryProductController.queryProductByPrice);
router.get('/filterProduct', queryProductController.filterProducts);

router.get('/getPhone', queryProductController.queryAllPhones);
router.get('/getLaptop', queryProductController.queryAllLaptops);
router.get('/getTablet', queryProductController.queryAllTablets);
router.get('/getHeadphone', queryProductController.queryAllHeadphones);

module.exports = router;