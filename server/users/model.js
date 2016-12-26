/**
 * Created by Dominika on 2016-12-05.
 */
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    role: String,
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
        exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET');
};

User = mongoose.model('User', UserSchema);

function create(newUser, callback) {
    var user = new User(newUser);
    user.username = newUser.username;
    user.setPassword(newUser.password);
    console.log(JSON.stringify(user));
    user.save(callback);
}

function findByUsername(user, callback) {
    User.find({username : user.username}, function (foundUser) {
        if(foundUser.validPassword(user.password)){
            callback(foundUser);
        }
    });

    return null;

}

exports.create = create;
exports.findByUsername = findByUsername;
