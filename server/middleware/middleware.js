const User = require('../models/User');

function checkAuthenticate(app,jwt) {

    return function middleware(req,res,next) {
    var token = req.cookies.c_auth;
    console.log('token value in middleware : ', token);
    // decode token
    if (token) {
        console.log('ifkkkk');
        User.verifyToken(token,function(err,user){
            if(err) throw err;
            if(!user) return res.json({
                isAuth: false,
                error: true
            })
            console.log('usser');
            console.log(user);
            req.token = token;
            req.user= user;
            next();
        });
        /*// verifies secret and checks exp
        jwt.verify(token, process.env.superSecret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                console.log('decoded value :',decoded);
                req.decoded = decoded;   
                next(); 
            }
        });*/
    } else {
        // if there is no token
        // return an error
        console.log('elase');
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        }
    }
}

module.exports = checkAuthenticate;