var express = require('express');
var router = express.Router();

const middleware  = require('../middleware/middleware');
const courseController = require('../controllers/courseController');

router.get('/all_courses',  courseController.getAllCourses);

router.get('/',  middleware.checkAdminAuthenticate(), courseController.getCourses);

router.put('/update_course_info/:id', middleware.checkInstructorAuthenticate(), middleware.checkAuthenticate, courseController.updateBasicInfoOfCourse);

router.get('/instructor_courses', middleware.checkInstructorAuthenticate(), courseController.getAllCoursesOfInstructor);

router.get('/user_courses', middleware.checkUserAuthenticate(), courseController.getAllCoursesUserEnrolled);

router.get('/:id',  middleware.checkAuthenticate(), courseController.getCourseByCourseID);


router.get('/lession/:id', middleware.checkAuthenticate(), courseController.getLessionOfCourseByLessionID);

router.get('/take_course/:id', middleware.checkUserAuthenticate(), courseController.getSectionOfCourseByCourseID);

router.get('/curriculum/:id',  courseController.getCourseCurriculumByCourseID);

router.post('/', middleware.checkInstructorAuthenticate(), middleware.checkAuthenticate,courseController.createCourse);

router.put('/update_curriculum/:id', middleware.checkInstructorAuthenticate(), courseController.updateCourseCurriculum);

router.put('/approve_reject_course/:id', middleware.checkAdminAuthenticate(), courseController.changeCourseStatus);

router.put('/submit_course_for_approval/:id', middleware.checkInstructorAuthenticate(), courseController.submitCourseForApproval);

router.delete('/:id', middleware.checkAdminAuthenticate(), courseController.deleteCourse);

module.exports = router;