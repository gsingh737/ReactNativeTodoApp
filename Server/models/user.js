const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validateEmail = (email) => {
    return (/\S+@\S+\.\S+/).test(email);
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please enter a valid email']
    },
    password: {
        type: String
    },
    todos: [
        {
            text: {type: String}
        }
    ]
});

userSchema.pre('save', function (next) {
    const user = this;
    if(user.isNew || user.isModified('password')) {
        bcrypt.genSalt(10, (err, result) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, result, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        next();
    }
});
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>{
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    })
}
module.exports = mongoose.model('user', userSchema);
