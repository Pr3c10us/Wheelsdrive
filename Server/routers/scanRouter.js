const router = require('express').Router();
const {
    scanProject,
    getProjectReport,
} = require('../controllers/scanController');
const authorize = require('../middleware/Authorization');

router
    .route('/')
    .post(authorize, scanProject)
    .get(authorize, getProjectReport);

module.exports = router;
