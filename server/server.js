var express = require('express');
var app = express();
var multer = require('multer');
require('dotenv').config();
const PORT = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./router.js');
var User = require('./models/User');
var methodOverride = require('method-override');
const checkAuthenticate = require('./middleware/middleware');
var cors = require('cors');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useCreateIndex: true, useNewUrlParser: true});

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//override with POST having ?_method=DELETE
//app.use(methodOverride('_method'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,POST, PUT,PATCH, DELETE");
  next();
});

//app.use(cors({ origin: 'http://localhost:3000',credetials: true}));
//app.use(cors({credentials: true,}));

app.use(cookieParser());

app.use(express.static('public'));
app.use("/uploads",express.static(__dirname +'/uploads'));

var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we're connected!");
  });


app.use('/api', router);
// use morgan to log requests to the console
app.use(morgan('dev'));


  
/*
app.get('/cookie',function(req, res){
  res.cookie('test111' , 'cookie_value111').send('Cookie is set');
});

app.post('/post_cookie',function(req, res){
  res.cookie('test444' , 'cookie_value111').send('Cookie is set');
});

app.get('/test', function(req, res) {
  console.log("Cookies :  ", req.cookies);
});

const middleware = (req,res,next) =>{
  var token = req.cookies.c_auth;
  console.log('token value in app : ', token);
  // decode token
  if (token) {
      User.verifyToken(token,function(err,user){
          if(err) throw err;
          if(!user) return res.json({
              isAuth: false,
              error: true
          })
          req.token = token;
          req.user= user;
          next();
      });
 
  } else {
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  }
  }

app.get('/auth',middleware,(req,res) =>{
  console.log('in ...');
  console.log(req.cookies);
  console.log(req.user);
  res.status(200).json({
      isAdmin: req.user.role==='0'?false:true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history

  })
});

app.post('/api/login1',function(req,res){
  console.log('email request',req.body);
  if(!req.body.email || !req.body.password) {
      return res.json({ success: false, message: 'Email and password is not provided' });
  } 
  
  User.findOne({"email" : req.body.email},function(err,user){
      if(err) {
          res.json({ success: false, message: 'Authentication failed. User not found.' + err });
      } else {
          if(!user) {
              res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else {
              //found user,check if password provided is correct 
              console.log(req.body.password);
              //console.log(user.password);await user.isValidPassword(password)
              var passwordIsValid = user.isValidPassword(req.body.password);//bcrypt.compareSync(req.body.password,user.password)
              console.log(passwordIsValid);
              //if(user.password !=  req.body.password) {
              if (!passwordIsValid) {
                  res.json({ success: false, message: 'Authentication failed. Invalid email or password.' });
              } else {
                  //this is valid user
                  
                  // if user is found and password is right
                  // create a token with only our given payload
                  // we don't want to pass in the entire user since that has the password
                  var token = user.generateToken((err,user)=>{
                      if(err) return res.status(400).send(err);
                      // return the information including token as JSON
                      res.cookie('c_auth',user.token,{ maxAge: 900000, httpOnly: true }).status(200).json({
                          success: true
                      });
                    
                  });
              }
          }
      }
  });
});
*/
// SET STORAGE
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
})

if(process.env.NODE_ENV === "production") {
  const path = require('path');
  app.get('/*',(req,res)=>{
    res.send(path.resolve(__dirname,'../client','build','index.html'));
  })
}

app.listen(PORT, ()=>{
    console.log(`Server is running at port: ${PORT}`);
});