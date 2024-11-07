const userRouter = require('./user');
const productCategoryRouter = require('./productCategory');
const { notFound, errorHandler } = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/prodCategory', productCategoryRouter);
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoutes;