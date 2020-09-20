var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const courseCategoryController = require('../controllers/courseCategoryController');

router.get('/',  middleware.checkAdminAuthenticate(),courseCategoryController.getAllCourseCategories);

//router.get('/course_categories1',courseCategoryController.getAllCourseCategories1);

router.post('/', middleware.checkAdminAuthenticate(),courseCategoryController.createCourseCategory);

router.put('/:id', middleware.checkAdminAuthenticate(),courseCategoryController.updateCourseCategory);

router.delete('/:id', middleware.checkAdminAuthenticate(),courseCategoryController.deleteCourseCategory);

module.exports = router;