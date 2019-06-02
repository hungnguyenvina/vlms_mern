var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Please input full name',
        maxlength: 100
    },
    email: {
        type: String,
        required: 'Please input email',
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: 'Please input password'
    },
    provider: {
        type: String,
        default: ''
    },
    provider_id: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ''
    },
    avatar_url: {
        type: String,
        default: ''
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
});


UserSchema.pre('save', async function (next) {
    if(this.isModified('password'))
    {
        console.log('user is changing password');
        try {
        const salt = await bcrypt.genSalt(10)
        const passwordhash = await bcrypt.hash(this.password, salt)
        this.password = passwordhash
        next()
        } catch (error) {
        next(error)
        }
    }
    else {
        console.log('password is not change');
        next();
    }
  })

UserSchema.methods.isValidPassword = function (newPassword) {
    try {
        return bcrypt.compareSync(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

UserSchema.methods.generateToken = function (cb) {
    var user = this;
    const payload = {
        user_id: user._id.toHexString()
    };

    var token = jwt.sign(payload,process.env.SECRET, {
        expiresIn: '1d' // expires in 24 hours
    });
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        return cb(null,user);
    });
    return token;

}

UserSchema.statics.verifyToken = function(token,cb) {
    var user = this;
    var token = jwt.verify(token, process.env.SECRET,function(err,decode) {
        //console.log('decode'+decode.user_id);
        user.findOne({"_id": decode.user_id, "token": token}, function(err,user) {
            //console.log(err);
            //console.log(user);
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

var User = mongoose.model('User',UserSchema);
module.exports = User;   