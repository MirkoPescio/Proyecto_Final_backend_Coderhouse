const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user.js");

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });

    // signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const user = await User.findOne({ 'email': email })
        if (user) {
            return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
        } else {
            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            await newUser.save();
            done(null, newUser);
        }
    }));

    // login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, req.flash('loginMessage', 'No User Found'));
        }
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
        }
        return done(null, user);
    }));
}