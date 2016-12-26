/**
 * Created by Dominika on 2016-12-05.
 */
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    role: String,
    lastLogin: Date,
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    // set expiration to 3 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 3);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role,
        lastLogin: this.lastLogin,
        exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET');
};

var User = mongoose.model('User', UserSchema);

function findAll(callback) {
    User.find(callback);
}

function create(newUser, callback) {
    var user = new User();

    user.username = newUser.username;
    user.lastLogin = new Date();
    user.role = newUser.role;

    user.setPassword(newUser.password);
    var token = user.generateJWT();
    user.save(callback(token));
}

function findByUsername(user, callback) {
    User.findOne({username : user.username}, function (err, foundUser) {
        if(foundUser.validPassword(user.password)){
            callback(err, foundUser);
        }
    });

    return null;

}

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            console.log("find here: " + JSON.stringify(user));
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));

exports.create = create;
exports.findByUsername = findByUsername;
exports.findAll = findAll;