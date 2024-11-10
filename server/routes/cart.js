const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/addToCart', verifyAccessToken , cartController.addToCart);
router.get('/queryCart/:userID', verifyAccessToken , cartController.queryCartOfUser);
router.delete('/deleteProductFromCart', verifyAccessToken, cartController.deleteProductFromCart);
router.put('/updateProductQuantity', verifyAccessToken, cartController.changeCartProductQuantity);

//dùng mấy cái dưới này nha, mấy cái bên trên là tui làm kiểu cũ :v
router.post('/addToUserCart', verifyAccessToken , cartController.addToUserCart);
router.get('/queryUserCart/:userID', verifyAccessToken , cartController.queryUserCart);
router.delete('/deleteProductFromUserCart', verifyAccessToken, cartController.deleteProductFromUserCart);
router.put('/updateUserCartProductQuantity', verifyAccessToken, cartController.changeUserCartProductQuantity);

module.exports = router;