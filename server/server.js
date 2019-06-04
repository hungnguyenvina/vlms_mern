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
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useCreateIndex: true, useNewUrlParser: true});

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//override with POST having ?_method=DELETE
//app.use(methodOverride('_method'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "https://arcane-wave-25280.herokuapp.com");
  
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,POST, PUT,PATCH, DELETE");
  next();
});

//app.use(cors({ origin: 'http://localhost:3000',credetials: true}));
//app.use(cors({credentials: true,}));

app.use(cookieParser());


//app.use(express.static(path.resolve(__dirname,'../client','build')));
app.use(express.static(path.resolve(__dirname,'../client','build','static')));
var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we're connected!");
  });

  

app.use('/api', router);
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
  res.json({url: 'https://arcane-wave-25280.herokuapp.com/uploads/'+req.body.filename});
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