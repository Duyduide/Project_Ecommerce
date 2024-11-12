const router = require('express').Router();
const productController = require('../controllers/productController');
const queryProductController = require('../controllers/queryProductController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createProduct', [verifyAccessToken, isAdmin], productController.createProduct);
router.delete('/deleteProduct/:id', [verifyAccessToken, isAdmin], productController.deleteProductById); //:productID
router.put('/updateProduct', [verifyAccessToken, isAdmin], productController.updateProductByID);


module.exports = router;