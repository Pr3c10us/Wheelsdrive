const router = require('express').Router();

// Importing the authController
const {
    signup,
    login,
    logout,
    verifyEmail,
    sendCode,
} = require('../controllers/authController');

router.route('/signup').post(signup);
router.route('/verifyEmail').post(verifyEmail);
router.route('/sendCode/:username').get(sendCode);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
