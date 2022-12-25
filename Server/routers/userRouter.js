const {
    getUserInfo,
    deleteGithubAuthToken,
    deleteUser,
    updateUserInfo,
} = require('../controllers/userController');
const authorize = require('../middleware/Authorization');

const router = require('express').Router();

router
    .route('/')
    .get(authorize, getUserInfo)
    .delete(authorize, deleteUser)
    .patch(authorize, updateUserInfo);
router.route('/github').delete(authorize, deleteGithubAuthToken);

module.exports = router;
