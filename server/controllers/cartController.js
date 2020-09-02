const User = require('../models/User');
const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.addCourseToCart = function(req, res) {
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
}

exports.deleteCart = function(req, res) {
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
}