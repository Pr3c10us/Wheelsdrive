const router = require('express').Router();
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectsController');
const authorize = require('../middleware/Authorization');

router.route('/').get(authorize, getAllProjects).post(authorize, createProject);
router
    .route('/:repository')
    .get(authorize, getProject)
    .patch(authorize, updateProject)
    .delete(authorize, deleteProject);

module.exports = router;
