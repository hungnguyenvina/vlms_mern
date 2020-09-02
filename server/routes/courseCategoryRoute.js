var express = require('express');
var router = express.Router();

const courseCategoryController = require('../controllers/courseCategoryController');

router.get('/',  courseCategoryController.getAllCourseCategories);

router.get('/course_categories1',courseCategoryController.getAllCourseCategories1);

router.post('/', courseCategoryController.createCourseCategory);

router.put('/:id', courseCategoryController.updateCourseCategory);

router.delete('/:id', courseCategoryController.deleteCourseCategory);

module.exports = router;