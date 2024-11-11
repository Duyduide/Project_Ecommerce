const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/createOrder', verifyAccessToken, orderController.createOrder);
router.get('/queryOrderOfUser', verifyAccessToken, orderController.queryOrderOfUser);
router.get('/queryOrderById/:orderID', verifyAccessToken, orderController.queryOrderById);
// router.put('/updateOrder', orderController.updateOrderById); //admin only
router.put('/cancelOrder', verifyAccessToken, orderController.cancelOrderById);
//thêm vài cái modify order cho admin
router.delete('/deleteOrder', verifyAccessToken, orderController.deleteOrderById);

module.exports = router;