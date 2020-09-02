var CourseCategory = require('../models/CourseCategory');
const mongoose = require('mongoose');

exports.getAllCourseCategories = function(req,res){
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
}

exports.createCourseCategory = function(req,res){
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
}

exports.updateCourseCategory = function(req,res){
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
}

exports.deleteCourseCategory = function(req,res){
    CourseCategory.findOneAndRemove({_id : req.params.id},function(err,courseCategory){
       if(err) {
            res.json({status: 'failure', message:'cannot delete course category!'+req.params.id});
        } else {
            res.json({status: 'success', message:'delete course category successfully!'+req.params.id});
        }
    });
}

exports.getAllCourseCategories1 = function(req,res) {
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
   
}