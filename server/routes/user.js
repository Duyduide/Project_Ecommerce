const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', userController.register);    
router.put('/finalRegister/:token', userController.finalRegister);
router.post('/login', userController.login);
router.get('/current', verifyAccessToken, userController.getCurrent);
router.post('/refreshToken', userController.refreshAccessToken)
router.get('/logout', userController.logOut);  
router.post('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);
router.get('/', [ verifyAccessToken, isAdmin ], userController.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUser)
router.put('/current', [verifyAccessToken], userController.updateUser)
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin)

module.exports = router;

// CRUD |   Create - Read - Update - Delete 
//      |   POST   - GET  - PUT    - DELETE
// POST + PUT   -> BODY
// GET + DELETE -> QUERY