/**
 * Created by Dominika on 2016-12-02.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name : String
});

Category = mongoose.model('Category', CategorySchema);

function findAll(callback) {
    Category.find(callback);
}

function create(newCategory, callback){
    var category = new Category(newCategory);

    category.save(callback);
}

function findById(id, callback) {
    Category.findOne({id : id}, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;