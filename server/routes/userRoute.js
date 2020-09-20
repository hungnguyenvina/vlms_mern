var express = require('express');
var router = express.Router();
var User = require('../models/User');
const middleware = require('../middleware/middleware');
const userController = require('../controllers/userController');

router.get('/', middleware.checkAdminAuthenticate(),userController.getAllUsers);

router.get('/authenticate/', middleware.checkAuthenticate(), userController.getAuthenticatedUserInfor);


router.get('/:id', middleware.checkUserAuthenticate(),userController.getUserByUserID);

router.get('/:id/cart/', middleware.checkUserAuthenticate(), function(req,res){
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



router.put('/become_instructor/:id',middleware.checkUserAuthenticate(), userController.becomeAnInstructor)
router.put('/:id',middleware.checkUserAuthenticate(), userController.updateUserInfo)

module.exports = router;