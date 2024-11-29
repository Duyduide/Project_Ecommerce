const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createRating', verifyAccessToken, ratingController.createRating);
router.get('/queryRatingOfProduct/:productId', ratingController.queryRatingOfProduct);
router.get('/queryRatingOfUser/:userId', ratingController.queryRatingOfUser);
router.get('/queryRatingOfOrder/:orderId', verifyAccessToken, ratingController.queryRatingOfOrder);
router.put('/updateRating/:ratingId', verifyAccessToken, ratingController.updateRating);
router.delete('/deleteRating/:ratingId', [ verifyAccessToken, isAdmin ], ratingController.deleteRating);

module.exports = router;