var QuestionCategory = require('../models/QuestionCategory');
const mongoose = require('mongoose');


exports.getAllQuestionCategories = function(req,res) {
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
}

exports.createQuestionCategory = function(req,res) {
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
}

exports.updateQuestionCategory = function(req,res) {
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
}

exports.deleteQuestionCategory = function(req,res) {
    QuestionCategory.findOneAndRemove({_id : req.params.id},function(err,product){
       if(err) {
            res.json({status: 'failure', message:'cannot delete product!'+req.params.id});
        } else {
            res.json({status: 'success', message:'delete product successfully!'+req.params.id});
        }
    });
}

exports.getAllQuestionCategories1 = function(req,res) {
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
}