const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/addToCart', verifyAccessToken , cartController.addToCart);
router.get('/queryCart/:userID', verifyAccessToken , cartController.queryCartOfUser);
router.delete('/deleteProductFromCart', verifyAccessToken, cartController.deleteProductFromCart);
router.put('/updateProductQuantity', verifyAccessToken, cartController.changeCartProductQuantity);

module.exports = router;