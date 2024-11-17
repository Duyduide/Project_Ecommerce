const router = require('express').Router();
const productCategoryController = require('../controllers/productCategoryController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
    
router.post('/', [verifyAccessToken, isAdmin], productCategoryController.createCategory);
router.get('/', productCategoryController.getCategories);
router.put('/:pcid', [verifyAccessToken, isAdmin], productCategoryController.updateCategory);
router.delete('/:pcid', [verifyAccessToken, isAdmin], productCategoryController.deleteCategory);

module.exports = router;

// CRUD |   Create - Read - Update - Delete 
//      |   POST   - GET  - PUT    - DELETE
// POST + PUT   -> BODY
// GET + DELETE -> QUERY