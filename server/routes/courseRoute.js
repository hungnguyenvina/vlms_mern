var express = require('express');
var router = express.Router();
const checkAuthenticate = require('../middleware/middleware');
const courseController = require('../controllers/courseController');

router.get('/all_courses',  courseController.getAllCourses);

router.get('/',  courseController.getCourses);

router.get('/instructor_courses', checkAuthenticate(),courseController.getAllCoursesOfInstructor);

router.get('/:id',  courseController.getCourseByCourseID);



router.get('/lession/:id',courseController.getLessionOfCourseByLessionID);

router.get('/take_course/:id',courseController.getSectionOfCourseByCourseID);

router.get('/curriculum/:id',  courseController.getCourseCurriculumByCourseID);

router.post('/', checkAuthenticate(),courseController.createCourse);

router.put('/update_curriculum/:id', courseController.updateCourseCurriculum);

//router.put('/:id', courseCategoryController.updateCourseCategory);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;