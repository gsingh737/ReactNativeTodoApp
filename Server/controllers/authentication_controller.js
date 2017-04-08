const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config')
function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret);
}
exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if(!email||!password) {
        return res.status(422).json({error: 'You must provide email and password'});
    }

    User.findOne({email}, (err, existingUser) => {
       if(err){
           return next(err);
       }
       if(existingUser) {
           return res.status(422).json({error: 'Email taken'});
       }
        var user = new User({
            email, password
        });

       user.save((err) => {
            if(err){
                return next(err);
            }
            res.json({user_id: user._id, token: tokenForUser(user)});
        });

    });
};

exports.signin = function (req, res, next) {
    var user = req.user;
    res.send({token: tokenForUser(user), user_id: user._id})
}