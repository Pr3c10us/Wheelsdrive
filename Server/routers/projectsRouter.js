const router = require('express').Router();
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getSearchRepositories,
    getRepositories,
} = require('../controllers/projectsController');
const authorize = require('../middleware/Authorization');

router.route('/').get(authorize, getAllProjects).post(authorize, createProject);
router
    .route('/:repository')
    .get(authorize, getProject)
    .patch(authorize, updateProject)
    .delete(authorize, deleteProject);

router.route('/repositories/:githubAuthToken').get(authorize, getSearchRepositories);
router
    .route('/getRepositories/:githubAuthToken')
    .get(authorize, getRepositories);

module.exports = router;
