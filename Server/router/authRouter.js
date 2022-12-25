const router = require('express').Router();

// Importing the authController
const { signup, login, logout } = require('../controller/authController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
