const User = require('../models/User');
const mongoose = require('mongoose');

exports.createInstructor = function(req,res) {
    var instructor = new Instructor(req.body);
    instructor.save(function(err,instructor){
        if(err) {
            res.status(500).json({message:'cannot1 add instructor',error: err});
        } else {
            res.json(instructor);
        }
    });
}

exports.createUser = function(req,res){
    var user = new User(req.body);
    user.role = 2;
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
}

exports.logout = function(req,res) {
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
}

exports.login = function(req,res) {
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
                        //expires in 14*24*3600000 (14 days x 24hours/a day * 3600 miliseconds/a hour)
                        res.cookie('c_auth',user.token,{ maxAge: 14*24*3600000, httpOnly: true }).status(200).json({
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
}