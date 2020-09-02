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
        history: req.user.history

    })
}