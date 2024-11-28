const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createOrder', verifyAccessToken, orderController.createOrder);
router.get('/queryOrderOfUser/:userId', verifyAccessToken, orderController.queryOrderOfUser);
router.get('/queryOrderById/:orderId', verifyAccessToken, orderController.queryOrderById);
router.put('/cancelOrder/:orderId', verifyAccessToken, orderController.cancelOrderById);
//admin only
router.get('/queryAllOrders', [verifyAccessToken, isAdmin], orderController.queryAllOrders); 
router.put('/updateOrder/:orderId',[verifyAccessToken, isAdmin], orderController.updateOrderById);
router.delete('/deleteOrder/:orderId', [verifyAccessToken, isAdmin], orderController.deleteOrderById);

module.exports = router;