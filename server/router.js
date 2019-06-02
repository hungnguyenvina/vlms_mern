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

router.get('/',function(req,res){
    res.send('hello world1111!');
});


app.use(function(req, res, next) {
    console.log('Timeff:', Date.now() )
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



router.get('/products', function(req,res){
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ////Product1.find(function(err,products){
    //    res.json(products);
    //});
});

router.get('/question_categories1',  function(req,res){
    let result = QuestionCategory.find({}).then(function(questionCategories){
        questionCategories.map((item) => {
            return {
                _id: item._id,
                question_category_parent_id: item.question_category_parent_id,
                question_category_parent_name: item.question_category_parent_name ,
                name: item.name,
                des: item.description
            } 
        });
        return res.json(questionCategories);
    });
});



router.get('/user/auth/',checkAuthenticate(),(req,res) =>{
    console.log('api user auth rouite authenticate : '+req.cookies['c_auth']);
    
    res.status(200).json({
        id: req.user._id,
        isAdmin: req.user.role==='0'?false:true,
        isAuth1: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history

    })
});

router.get('/user/:id/cart/', function(req,res){
    User.find({_id: req.params.id})
        .populate({path : 'cart.$.id',  select: ''})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view question categories',error: err});
            
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    token: item.token,
                    cart: item.cart,
                    status: item.status
                } 
            });
            res.json(newResult);
    });
});

router.get('/question_categories',  function(req,res){
    QuestionCategory.find({})
            .populate({path : 'question_category_parent_id',  select: 'name'})
            .exec(function (err, results) {
                if (err) return res.status(500).json({message:'cannot view question categories',error: err});
                let newResult = results.map((item) => {
                    return {
                        _id: item._id,
                        name: item.name,
                        description: item.description,
                        question_category_parent_id: item.question_category_parent_id==null?'':item.question_category_parent_id._id,
                        question_category_parent_name: item.question_category_parent_id==null?'':item.question_category_parent_id.name,
                        status: item.status
                    } 
                });
                res.json(newResult);
            });
    });

router.post('/question_category', function(req,res){
    let form = {};
    var id = mongoose.Types.ObjectId();
    if(req.body.question_category_parent_id==="" || req.body.question_category_parent_id==="0"){
        form = {
            ...req.body,
            question_category_parent_id : id
        }
    } 
    else {
        form = {
            ...req.body
        }
    }
    console.log('form....');
    console.log(form);
    var questionCategory = new QuestionCategory(form);
    questionCategory.save(function(err,product){
        if(err) {
            res.status(500).json({message:'cannot add question category', error: err});
        } else {
            res.json(product);
        }
    });
});

router.put('/user/become_instructor/:id',function(req,res){
    User.findOneAndUpdate(
        { _id : req.params.id},
        { role: 1}, 
        {new : true}
    )
    .exec(function(err,user){
        if(err) return res.status(400).json({success: false, message:'Cannot become an instructor'+err});
        return res.status(200).json({success: true, message:'You are now an instructor'});
    });
})

router.put('/question_category/:id',function(req,res){
    let form = {};
    var id = mongoose.Types.ObjectId();
    if(req.body.question_category_parent_id==="" || req.body.question_category_parent_id==="0"){
        form = {
            ...req.body,
            question_category_parent_id : id
        }
    } 
    else {
        form = {
            ...req.body
        }
    }
    console.log('form....');
    console.log(form);
    /* QuestionCategory.findOneAndUpdate({_id : req.params.id},form, {new : true},function(err,questionCategory){
        console.log('inside put question category..');
        console.log(questionCategory);
        res.json({questionCategory: questionCategory,status: 'success', message:'update question category successfully with id:!'+req.params.id});
    });*/
    QuestionCategory.findOneAndUpdate(
        {_id : req.params.id},form, {new : true}
    )
    .populate({path : 'question_category_parent_id',  select: 'name'})
    .exec(function(err,questionCategory){
        const tranformQuestionCategory = {
            '_id': questionCategory._id,
            'name': questionCategory.name,
            'description': questionCategory.description,
            'question_category_parent_id': questionCategory.question_category_parent_id==null?'':questionCategory.question_category_parent_id._id,
            'question_category_parent_name':  questionCategory.question_category_parent_id==null?'':questionCategory.question_category_parent_id.name
        }
        res.json({questionCategory: tranformQuestionCategory,status: 'success', message:'update question category successfully with id:!'+req.params.id});
    });
});

router.delete('/question_category/:id',function(req,res){
    QuestionCategory.findOneAndRemove({_id : req.params.id},function(err,product){
       if(err) {
            res.json({status: 'failure', message:'cannot delete product!'+req.params.id});
        } else {
            res.json({status: 'success', message:'delete product successfully!'+req.params.id});
        }
    });
});

router.get('/lession/:id',  function(req,res){
    let result = Lession.find({'_id': req.params.id})
    .select('name description content')
    .exec(function (err, results) {
        if (err) return res.status(500).json({message:'cannot view lession',error: err});
        res.json(results);
    });

});

router.get('/take_course/:id',  function(req,res){
    let result = Section.find({'course_id': req.params.id})
    .select('name description content section_id')
    .populate({path : 'section_id',  select: 'name'})
    .exec(function (err, results) {
        if (err) return res.status(500).json({message:'cannot view course categories',error: err});
        res.json(results);
    });

});

router.get('/course/curriculum/:id',  function(req,res){
    let result = Lession.find({'course_id': req.params.id})
        .select('name description content section_id')
        .populate({path : 'section_id',  select: 'name'})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view course categories',error: err});
            let newResult = results.map((item) => {
                return {
                    _id: item._id,
                    title: item.section_id.name,
                    description: item.section_id.description,
                    lessions: results 
                } 
            });
            res.json(results);
            //res.json(results);
        });

        
});

router.get('/cart/delete/', checkAuthenticate(),function(req, res) {
    console.log(req.user._id);
    console.log('...');
    User.findOneAndUpdate(
    {   _id: req.user._id },
    { "$pull": 
        {"cart": {"id": mongoose.Types.ObjectId(req.query.id)}}
    },
    { new: true},
    (err,doc) => {
        let cart = doc.cart;
        let coursesIDs = cart.map(item=> {
            return mongoose.Types.ObjectId(item.id)
        })

        Course.find({_id: {$in: coursesIDs}})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.status(200).json({
                cartDetail: newResult,
                cart
            });
        });
    }
    );
});

router.post('/cart/add/:course_id',checkAuthenticate(), function(req, res) {
    let duplicate = false;
    let user_id = req.user._id;
    User.findOne({_id: user_id},(error,user) =>{
        user.cart.forEach((item)=>{
            console.log('req.params.course_id='+req.params.course_id);
            console.log('item.id='+item.id);
            if( item.id == req.params.course_id) {
                console.log('duplicate');
                duplicate=true;
            }
        });

        if(duplicate) {
            console.log('update');
            User.findOneAndUpdate(
                { _id: user_id, "cart.id": mongoose.Types.ObjectId(req.params.course_id)},
                { $inc: { "cart.$.quantity": 1 }},
                { new: true},
                (error,doc) => {
                    if(error) return res.json({success:false,err});
                    res.status(200).json(doc.cart);
                })
         } else {
            User.findOneAndUpdate(
                { _id: user_id},
                { $push: { cart: {
                    id: mongoose.Types.ObjectId(req.params.course_id),
                    quantity: 1,
                    date: Date.now()
                }}},
                { new: true},
                (error,doc) => {
                    if(error) return res.json({success:false,err});
                    res.status(200).json(doc.cart);
                }
            )
        }
    });
});

router.get('/course_categories',  function(req,res){
    CourseCategory.find({})
        .populate({path : 'course_category_parent_id',  select: 'name'})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view course categories',error: err});
            let newResult = results.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    course_category_parent_id: item.course_category_parent_id==null?'':item.course_category_parent_id._id,
                    course_category_parent_name: item.course_category_parent_id==null?'':item.course_category_parent_id.name,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
});
        
router.get('/course_categories1',  function(req,res){
    CourseCategory.find({}).then(function(courseCategories){
        courseCategories.map((item) => {
            return {
                _id: item._id,
                course_category_parent_id: item.course_category_parent_id,
                course_category_parent_name: item.course_category_parent_name ,
                name: item.name,
                des: item.description
            } 
        });
        return res.json(courseCategories);
    });
   
});

router.post('/course_category', function(req,res){
    let form = {};
    var id = mongoose.Types.ObjectId();
    if(req.body.course_category_parent_id==="" || req.body.course_category_parent_id==="0"){
        form = {
            ...req.body,
            course_category_parent_id : id
        }
    } 
    else {
        form = {
            ...req.body
        }
    }
    console.log('form....');
    console.log(form);
    var courseCategory = new CourseCategory(form);
    courseCategory.save(function(err,courseCategory){
        if(err) {
            res.status(500).json({message:'cannot add course category', error: err});
        } else {
            res.json(courseCategory);
        }
    });
});

router.put('/course_category/:id',function(req,res){
    let form = {};
    var id = mongoose.Types.ObjectId();
    if(req.body.course_category_parent_id==="" || req.body.course_category_parent_id==="0"){
        form = {
            ...req.body,
            course_category_parent_id : id
        }
    } 
    else {
        form = {
            ...req.body
        }
    }
    console.log('form....');
    console.log(form);
    /*CourseCategory.findOneAndUpdate({_id : req.params.id},form, {new : true},function(err,courseCategory){
        console.log('inside put course category..');
        console.log(courseCategory);
        res.json({courseCategory: courseCategory,status: 'success', message:'update course category successfully with id:!'+req.params.id});
    });*/
    CourseCategory.findOneAndUpdate(
        {_id : req.params.id},form, {new : true}
    )
    .populate({path : 'course_category_parent_id',  select: 'name'})
    .exec(function(err,courseCategory){
        const tranformCourseCategory = {
            '_id': courseCategory._id,
            'name': courseCategory.name,
            'description': courseCategory.description,
            'course_category_parent_id': courseCategory.course_category_parent_id==null?'':courseCategory.course_category_parent_id._id,
            'course_category_parent_name':  courseCategory.course_category_parent_id==null?'':courseCategory.course_category_parent_id.name
        }
        res.json({courseCategory: tranformCourseCategory,status: 'success', message:'update course category successfully with id:!'+req.params.id});
    });

    
});

router.delete('/course_category/:id',function(req,res){
    CourseCategory.findOneAndRemove({_id : req.params.id},function(err,courseCategory){
       if(err) {
            res.json({status: 'failure', message:'cannot delete course category!'+req.params.id});
        } else {
            res.json({status: 'success', message:'delete course category successfully!'+req.params.id});
        }
    });
});

router.get('/product/:id',function(req,res){
    //Product1.findById(req.params.id,function(err,product){
    //    if(err) {
    //        res.status(500).json({message:'cannot find product'+ req.params.id});
    //    } else {
    //        res.json(product);
    //    }
    //});
});

router.post('/products', function(req,res){
    var product = new Product1(req.body);
    product.save(function(err,product){
        if(err) {
            res.status(500).json({message:'cannot add product'});
        } else {
            res.json(product);
        }
    });
});

router.put('/products/:id',function(req,res){
    //Product1.findOneAndUpdate({_id : req.params.id},req.body,function(err,product){
    //    res.json({status: 'success', message:'update product successfully!'+req.params._id});
    //});
});

router.delete('/products/:id',function(req,res){
    //Product1.findOneAndRemove({_id : req.params.id},function(err,product){
    //    if(err) {
    //        res.json({status: 'failure', message:'cannot delete product!'+req.params._id});
    //    } else {
    //        res.json({status: 'success', message:'delete product successfully!'+req.params._id});
    //    }
    //});
});

router.post('/instructor', function(req,res){
    var instructor = new Instructor(req.body);
    instructor.save(function(err,instructor){
        if(err) {
            res.status(500).json({message:'cannot1 add instructor',error: err});
        } else {
            res.json(instructor);
        }
    });
});

router.post('/course', function(req,res){
    var course = new Course(req.body);
    course.save(function(err,result){
        if(err) {
            res.status(500).json({message:'cannot add course',error: err});
        } else {
            res.json(result);
        }
    });
});

router.put('/course/update_curriculum/:id', function(req,res){
    const section_title = req.body.section_title;
    const course_id = req.params.id;
    const sectionForSave = {
        name : section_title,
        description: '',
        course_id: course_id,
        status: 0
    }

    const lessions = req.body.lessions;
    var section = new Section(sectionForSave);
    let ok=true;
    let message="";
    section.save(function(err,result){
        if(err) {
            ok=false;
            message= 'cannot add section'+err;
            //res.status(500).json({message:'cannot add section',error: err});
        } else {
            //res.json(lessions[0]['name']);
            const sectionID =result._id;
            for (var i = 0 ; i < lessions.length; i++) {
                const lessionForSave = {
                    name: lessions[i]['name'],
                    content: lessions[i]['content'],
                    section_id: sectionID,
                    course_id: course_id
                }
                var lession = new Lession(lessionForSave);
    
                lession.save(function(err,lessionResult){
                    if(err) {
                        ok=false;
                        message= 'cannot add lession'+err;
                        //res.status(500).json({message:'cannot add lession',error: err});
                    } else {
                        //res.json(lessionResult);
                    }
                });
            }
        }
    });

    if(ok) {
        res.json({success: true,message:message});
    }
    else {
        res.status(404).json({success: false,message:message});
    }
});

/*router.put('/course/update_curriculum/:id', function(req,res){
    const section_title = req.body.section_title;
    const course_id = req.params.id;
    const sectionForSave = {
        name : section_title,
        description: '',
        course_id: course_id,
        status: 0
    }

    const lessions = req.body.lessions;
    var section = new Section(sectionForSave);
    
    section.save(function(err,result){
        if(err) {
            res.status(500).json({message:'cannot add section',error: err});
        } else {
            //res.json(lessions[0]['name']);
            const sectionID =result._id;
            for (var i = 0 ; i < lessions.length; i++) {
                console.log(lessions[i]);
                const lessionForSave = {
                    name: lessions[i]['name'],
                    content: lessions[i]['content'],
                    section_id: sectionID
                }
                var lession = new Lession(lessionForSave);
    
                lession.save(function(err,lessionResult){
                    if(err) {
                        res.status(500).json({message:'cannot add lession',error: err});
                    } else {
                        res.json(lessionResult);
                    }
                });
            }
        }
    });
});
*/


router.get('/instructor_courses', function(req,res){
    Course.find({})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
});

router.get('/all_courses', function(req,res){
    Course.find({})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.status(200).json(newResult);
        });
});

router.get('/courses', function(req,res){
    let courses = req.query.id;
    let type = req.query.type;
    if(type==="array") {
        let courseIDs = courses.split(',');
        console.log(courseIDs);
        courses = courseIDs.map(item => {
            return mongoose.Types.ObjectId(item)
        });
    }
    Course.find({_id: {$in: courses}})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
});

router.get('/course/:id', function(req,res){
    Course.find({_id: req.params.id})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
});

router.get('/users', function(req,res){
    User.find(function(err,user){
        res.json(user);
    });
});

router.get('/user/:id', function(req,res){
    User.find({_id: req.params.id},function(err,user){
        res.json(user);
    });
});

router.get('/users1',function(req,res){
    User.find(function(err,user){
        res.json(user);
    });
});

router.post('/register', function(req,res){
    var user = new User(req.body);
    user.save(function(err1,user1){
        if(err1) return res.status(400).send(err);
        user1.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            // return the information including token as JSON
            res.cookie('c_auth',user.token,{ maxAge: 9000000, httpOnly: true }).status(200).json({
                success: true
            });
        });
        
    });
});

router.get('/logout',checkAuthenticate(),function(req,res){
    console.log('/logout...');
    console.log(req.user);
    User.findOneAndUpdate(
        { _id: req.user._id},
        { token: ''},
        (err,doc) => {
            if(err) return res.status(400).json({success: false, err});
            res.cookie('c_auth','',{ expiresIn: Date.now(), httpOnly: true }).status(200).json({
                success: true
            });
        }
    )
});

router.post('/login',function(req,res){
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
                        res.cookie('c_auth',user.token,{ maxAge: 9000000, httpOnly: true }).status(200).json({
                            success: true,
                            user: user
                        });

                        //console.log('token value in router : ', res.cookie);
                        console.log('token value in login : ', req.cookies['c_auth']);
                    });
                }
            }
        }
    });
});

module.exports = router;

