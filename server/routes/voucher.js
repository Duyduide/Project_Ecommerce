const router = require('express').Router();
const voucherController = require('../controllers/voucherController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createVoucher', [verifyAccessToken, isAdmin], voucherController.createVoucher);
router.put('/updateVoucher', [verifyAccessToken, isAdmin], voucherController.updateVoucher);
router.delete('/deleteVoucher/:voucherCode', [verifyAccessToken, isAdmin], voucherController.deleteVoucher);
router.get('/findVoucherByCode/:voucherCode', verifyAccessToken, voucherController.findVoucherByCode);
router.get('/findAllAvailableVouchers/:userMembership', verifyAccessToken, voucherController.queryPublicVouchers);
router.get('/findAllVouchers', [verifyAccessToken, isAdmin], voucherController.queryAllVouchers);

module.exports = router;