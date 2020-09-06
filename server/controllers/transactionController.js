const User = require('../models/User');
const Course = require('../models/Course');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.saveUserTransaction = async function(req,res){
    console.log('saving user transactionaaaabb....');
    console.log(req.body);
    delete req.body.order_details;
    console.log('saving user transactionaaaabb after delete order_details property');
    console.log(req.body);

    const transactionDetails = req.body.transaction_details;

    for( var i = 0; i < transactionDetails.length; i++){ 
        const courseIDItem = transactionDetails[i].course_id;
        const courseName = transactionDetails[i].course_title;
        console.log('course id:'+ courseIDItem);
        console.log('course name:'+ courseName);
        await Course.findOne({_id: mongoose.Types.ObjectId(courseIDItem)})
        .exec(async function (errCourse, courseResults) {
            console.log(courseResults);
            const instructor_id = courseResults.instructor_id;
            const course_fee = courseResults.fee;
            console.log('instructor_id='+instructor_id);
            await User.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(instructor_id)},
                { $push: { transaction: {
                    transaction_id: req.body.transaction_id,
                    transaction_date: req.body.transaction_date,
                    quantity: 1,
                    course_id: courseIDItem,
                    course_name: courseName,
                    course_price: course_fee
                }}},
                { new: true},
                (error1,doc) => {
                    //if(error1) return res.json({success:false,err});
                    //res.status(200).json(doc.cart);
                    console.log(doc);
                }
            )
        })
    }

    var userTransaction = new Transaction(req.body);
    userTransaction.save(function(err,userTransactionResult){
        if(err) {
            res.status(500).json({success: false, message: err});
        } else {
            res.json({
                success: true,
                transaction: userTransactionResult
            });
        }
    });
}