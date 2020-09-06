var express = require('express');
var app = express();
const path = require('path');
var multer = require('multer');
require('dotenv').config();
const PORT = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router.js');
const routerUser = require('./routes/userRoute');
const routerQuestionCategory = require('./routes/questionCategoryRoute');
const routerCourseCategory = require('./routes/courseCategoryRoute');
const routerCourse = require('./routes/courseRoute');
const routerGuest = require('./routes/guestRoute');
const routerCart = require('./routes/cartRoute');
const routerTransaction = require('./routes/transactionRoute');
mongoose.Promise = global.Promise;
console.log('mongo db uri');
console.log(process.env.MONGODB_URI);
//mongoose.connect(process.env.MONGODB_URI,{ useCreateIndex: true, useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/vlms_mevnc",{ useCreateIndex: true, useNewUrlParser: true});

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//override with POST having ?_method=DELETE
//app.use(methodOverride('_method'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "https://arcane-wave-25280.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,POST, PUT,PATCH, DELETE");
  next();
});

//app.use(function(req, res, next) {
//  console.log('Timeff:', Date.now() )
//  res.header("Access-Control-Allow-Origin", "https://arcane-wave-25280.herokuapp.com");
//  res.header("Access-Control-Allow-Credentials", true);
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});


//app.use(cors({ origin: 'http://localhost:3000',credetials: true}));
//app.use(cors({credentials: true,}));

app.use(cookieParser());

app.use('/uploads',express.static(path.resolve(__dirname,'uploads')));


app.use(express.static(path.resolve(__dirname,'../client','build')));
//app.use(express.static('client/build'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

  
app.use('/api/users', routerUser);
app.use('/api/question_categories', routerQuestionCategory);
app.use('/api/course_categories', routerCourseCategory);
app.use('/api/courses', routerCourse);
app.use('/api/carts', routerCart);
app.use('/api/transactions', routerTransaction);
app.use('/api/', routerGuest);

//app.use('/api', router);
// use morgan to log requests to the console
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('1');
    cb(null, 'server/uploads')
  },
  filename: function (req, file, cb) {
    console.log('2');
    console.log(file);
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.post('/api/upload_file', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  console.log('3');
  console.log('upload filevvvvvvvvvvvxxxxxx...');
  console.log(req.body.filename);
  //if (!file) {
  //  const error = new Error('Please upload a file')
  //  error.httpStatusCode = 400
  //  return next(error)
  //}
   // res.send(file)
   res.json({url: 'http://localhost:3004/uploads/'+req.body.filename});
  //res.json({url: 'https://arcane-wave-25280.herokuapp.com/uploads/'+req.body.filename});
})


if(process.env.NODE_ENV === "production") {
  const path = require('path');
  app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client','build','index.html'));
  })
}

app.listen(PORT, ()=>{
    console.log(`Server is running at port: ${PORT}`);
});