const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.post('/createOrder', orderController.createOrder);
router.get('/queryOrderOfUser', orderController.queryOrderOfUser);
router.get('/queryOrderById/:orderID', orderController.queryOrderById);
router.put('/updateOrder', orderController.updateOrderById); //admin only
router.delete('/deleteOrder', orderController.deleteOrderById);
//thêm vài cái modify order cho admin

module.exports = router;