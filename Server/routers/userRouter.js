const {
    getUserInfo,
    deleteGithubAuthToken,
    deleteUser,
    // updateUserInfo,
    addGithubToken,
} = require('../controllers/userController');
const authorize = require('../middleware/Authorization');

const router = require('express').Router();

router
    .route('/')
    .get(authorize, getUserInfo)
    .delete(authorize, deleteUser)
    // .patch(authorize, updateUserInfo);
router
    .route('/github')
    .put(authorize, addGithubToken)
    .delete(authorize, deleteGithubAuthToken);

module.exports = router;
