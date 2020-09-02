var express = require('express');
var router = express.Router();
const checkAuthenticate = require('../middleware/middleware');
const cartController = require('../controllers/cartController');


router.get('/delete/', checkAuthenticate(), cartController.deleteCart);

router.post('/add/:course_id',checkAuthenticate(), cartController.addCourseToCart);

module.exports = router;