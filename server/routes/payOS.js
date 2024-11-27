const router = require('express').Router();
const payOScontroller = require('../controllers/payOSController');

router.post('/createPayment', payOScontroller.createPayment);
//router.post('/receiveHook', payOScontroller.receiveHook);
router.get('/checkPaymentStatus/:orderCode', payOScontroller.checkPaymentStatus);

module.exports = router;