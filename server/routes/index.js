const userRouter = require('./user');
const productCategoryRouter = require('./productCategory');
const productRouter = require('./product');
const voucherRouter = require('./voucher');
const orderRouter = require('./order');
const cartRouter = require('./cart');
const queryProductRouter = require('./queryProduct');
const payOSRouter = require('./payOS');
const ratingRouter = require('./rating');
const { notFound, errorHandler } = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/prodCategory', productCategoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/voucher', voucherRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/queryProduct', queryProductRouter);
    app.use('/api/payOS', payOSRouter);
    app.use('/api/rating', ratingRouter);
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoutes;