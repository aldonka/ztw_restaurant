/**
 * Created by Dominika on 2016-12-27.
 */
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    orderDate: Date,
    tableNo: Number,
    dishes: Array,
    orderSource: Number,
    name: String
});

Order = mongoose.model('Order', OrderSchema);

function create(data, callback) {
    var data = new Order(data);
    data.save(callback);
}

function update(newData, callback) {
    Order.findOneAndUpdate({_id: newData._id}, newData, callback);
}

function remove(id, callback) {
    Order.findByIdAndRemove(id, callback);
}

function findAll(callback) {
    Order.find(callback);
}

function findById(id, callback) {
    Order.findById(id, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;
exports.update = update;
exports.remove = remove;