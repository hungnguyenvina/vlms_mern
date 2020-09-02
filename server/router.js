var express = require('express');
var router = express.Router();
var QuestionCategory = require('./models/QuestionCategory');
var CourseCategory = require('./models/CourseCategory');
var Course = require('./models/Course');
var Section = require('./models/Section');
var Lession = require('./models/Lession');
var User = require('./models/User');
var Instructor = require('./models/Instructor');
var jwt = require('jsonwebtoken');
var app = express();
const checkAuthenticate = require('./middleware/middleware');
var bcrypt = require('bcryptjs');
//var CircularJSON = require('circular-json');
// secret key for create json web token
require('dotenv').config();

//app.set('superSecret', process.env.superSecret); 
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    console.log('Timeff:', Date.now() )
    res.header("Access-Control-Allow-Origin", "https://arcane-wave-25280.herokuapp.com");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



module.exports = router;

