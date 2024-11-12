const router = require('express').Router();
const voucherController = require('../controllers/voucherController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createVoucher', [verifyAccessToken, isAdmin], voucherController.createVoucher);
router.put('/updateVoucher', [verifyAccessToken, isAdmin], voucherController.updateVoucher);
router.delete('/deleteVoucher', [verifyAccessToken, isAdmin], voucherController.deleteVoucher);
router.get('/findVoucherByCode/:voucherCode', verifyAccessToken, voucherController.findVoucherByCode);
router.get('/queryAllAvailableVouchers/:membership', verifyAccessToken, voucherController.queryPublicVouchers);

module.exports = router;