var express = require('express');
var router = express.Router();
var User = require('../models/User');
const checkAuthenticate = require('../middleware/middleware');
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/authenticate/', checkAuthenticate(), userController.getAuthenticatedUserInfor);


router.get('/:id', userController.getUserByUserID);

router.get('/:id/cart/', function(req,res){
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



router.put('/become_instructor/:id',function(req,res){
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


module.exports = router;