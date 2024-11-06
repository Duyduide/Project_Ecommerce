const router = require('express').Router();
const queryProductController = require('../controllers/queryProductController');

router.get('/getAllProduct', queryProductController.queryAllProducts);
router.get('/getProductById', queryProductController.queryProductByID);
router.get('/getProductByType', queryProductController.queryProductByType);
router.get('/getProductByManufacturer', queryProductController.queryProductByManufacturer);
// router.get('/getProductByPrice', queryProductController.queryProductByPrice);
router.get('/filterProduct', queryProductController.filterProducts);

module.exports = router;