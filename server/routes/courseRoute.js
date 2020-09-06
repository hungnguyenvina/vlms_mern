var express = require('express');
var router = express.Router();

const checkAuthenticate = require('../middleware/middleware');
const courseController = require('../controllers/courseController');

router.get('/all_courses',  courseController.getAllCourses);

router.get('/',  courseController.getCourses);

router.put('/update_course_info/:id',checkAuthenticate(), courseController.updateBasicInfoOfCourse);

router.get('/instructor_courses', checkAuthenticate(), courseController.getAllCoursesOfInstructor);

router.get('/user_courses', checkAuthenticate(), courseController.getAllCoursesUserEnrolled);

router.get('/:id',  courseController.getCourseByCourseID);



router.get('/lession/:id',courseController.getLessionOfCourseByLessionID);

router.get('/take_course/:id',courseController.getSectionOfCourseByCourseID);

router.get('/curriculum/:id',  courseController.getCourseCurriculumByCourseID);

router.post('/', checkAuthenticate(),courseController.createCourse);

router.put('/update_curriculum/:id', courseController.updateCourseCurriculum);

router.put('/approve_reject_course/:id',checkAuthenticate(), courseController.changeCourseStatus);

router.put('/submit_course_for_approval/:id',checkAuthenticate(), courseController.submitCourseForApproval);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;