const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');
var localOptions = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOptions, (email, password, done) => {
   User.findOne({email}, (err, user) => {
       if(err) {
           return next(err);
       }
       if(!user) {
           return done(null, false);
       }
       user.comparePassword(password, (err, isMatch) => {
            if(err) {
                return done(err);
            }
            if(!isMatch){
                return done(null, false);
            }
            return done(null, user)
       });
   })
});


const jwtoptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const jwtStrategy = new JwtStrategy(jwtoptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
       if(err){
           return done(err, false);
       }
       if(user) {
           done(null, user);
       }
       else {
           done(null, false);
       }
    });
});

passport.use(jwtStrategy);
passport.use(localStrategy);