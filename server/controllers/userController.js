const User = require('../models/User');
const mongoose = require('mongoose');
exports.getAllUsers = function(req,res){
    User.find(function(err,users){
        if(err) {
            res.json({ error: err });
        }
        res.json(users);
    });
}

exports.becomeAnInstructor = function(req,res){
    User.findOneAndUpdate(
        { _id : req.params.id},
        { role: 1}, 
        {new : true}
    )
    .exec(function(err,user){
        if(err) return res.status(400).json({success: false, message:'Cannot become an instructor'+err});
        return res.status(200).json({success: true, message:'You are now an instructor'});
    });
}

exports.updateUserInfo = function(req,res){
    User.findOneAndUpdate(
        { _id : req.params.id},
        req.body, 
        {new : true}
    )
    .exec(function(err,user){
        if(err) return res.status(400).json({success: false, message:'Cannot update user info'+err});
        req.user = user;
        return res.status(200).json({success: true, user});
    });
}

exports.getUserByUserID = async function(req,res){
    if(!mongoose.Types.ObjectId.isValid( req.params.id)){
        res.json({error:'Invalid user id'});
    }
    else{
        const userResult = await User.find({_id: req.params.id});
        if(userResult.length > 0) {
            res.json({ userResult});
        }
        else{
            res.json({users: null});
        }
    }
}


exports.getAuthenticatedUserInfor = (req,res) => {
    console.log('api user auth rouite authenticate : '+req.cookies['c_auth']);
    
    res.status(200).json({
        id: req.user._id,
        isAdmin: req.user.role==='0'?false:true,
        isAuth1: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
        avatar_url: req.user.avatar_url

    })
}