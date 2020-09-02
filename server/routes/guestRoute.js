var express = require('express');
var router = express.Router();
var User = require('../models/User');
const checkAuthenticate = require('../middleware/middleware');
const guestController = require('../controllers/guestController');

router.post('/instructor', guestController.createInstructor);

router.post('/register', guestController.createUser);

router.get('/logout',checkAuthenticate(), guestController.logout);

router.post('/login', guestController.login);


module.exports = router;