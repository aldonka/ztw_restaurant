/**
 * Created by Dominika on 2016-12-27.
 */
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    author: String,
    timestamp: Date,
    email: String,
    content: String,
    dishId: String

});

Comment = mongoose.model('DishComment', CommentSchema);

function findAll(callback) {
    Comment.find(callback);
}

function create(newComment, callback) {
    var comment = new Comment(newComment);
    comment.timestamp = (new Date()).toUTCString();
    comment.save(callback);
}

function update(newComment, callback) {
    Comment.findOneAndUpdate({_id: newComment._id}, newComment, callback);
}

function remove(id, callback) {
    Comment.findByIdAndRemove(id, callback);
}

function findById(id, callback) {
    Comment.findById(id, callback);
}

function findByDishId(dishId, callback) {
    Comment.find({dishId: dishId}, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;
exports.findByDishId = findByDishId;
exports.update = update;
exports.remove = remove;