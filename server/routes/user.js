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
router.put('/current', [verifyAccessToken], userController.updateUser)
// ADMIN
router.get('/', [ verifyAccessToken, isAdmin ], userController.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUser);
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin);
// GOOGLE
router.post('/loginWithGoogle', userController.loginWithGoogle);

module.exports = router;

// CRUD |   Create - Read - Update - Delete 
//      |   POST   - GET  - PUT    - DELETE
// POST + PUT   -> BODY
// GET + DELETE -> QUERY