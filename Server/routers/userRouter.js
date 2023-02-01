const {
    getUserInfo,
    deleteUser,
    addGithubToken,
    changePassword,
} = require('../controllers/userController');
const authorize = require('../middleware/Authorization');

const router = require('express').Router();

router.route('/').get(authorize, getUserInfo).delete(authorize, deleteUser);
router.route('/github').put(authorize, addGithubToken);
router.route('/password').put(authorize, changePassword);

module.exports = router;
