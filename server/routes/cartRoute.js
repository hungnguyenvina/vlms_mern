var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const cartController = require('../controllers/cartController');


router.get('/delete/', middleware.checkAuthenticate(), cartController.deleteCart);

router.post('/add/:course_id', middleware.checkAuthenticate(), cartController.addCourseToCart);

module.exports = router;