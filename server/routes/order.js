const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/createOrder', verifyAccessToken, orderController.createOrder);
router.get('/queryOrderOfUser/:userId', verifyAccessToken, orderController.queryOrderOfUser);
router.get('/queryOrderById/:orderId', verifyAccessToken, orderController.queryOrderById);
// router.put('/updateOrder', orderController.updateOrderById); //admin only
router.put('/cancelOrder/:orderId', verifyAccessToken, orderController.cancelOrderById);
//thêm vài cái modify order cho admin
router.delete('/deleteOrder/:orderId', verifyAccessToken, orderController.deleteOrderById);

module.exports = router;