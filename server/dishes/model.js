var mongoose = require('mongoose');

var DishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    ingradients: Array,
    allergens: Array,
    description: String,
    category: String,
    stars: Number,
    avaliable: Boolean,
    img: String

});

Dish = mongoose.model('Dish', DishSchema);

// Getter
DishSchema.path('price').get(function (num) {
    return (num / 100).toFixed(2);
});

// Setter
DishSchema.path('price').set(function (num) {
    return num * 100;
});

function findAll(callback) {
    Dish.find(callback);
}

function create(newDish, callback) {
    var dish = new Dish(newDish);

    dish.save(callback);
}

function update(newDish, callback) {
    Dish.findOneAndUpdate({_id: newDish._id}, newDish, callback);
}

function remove(id, callback) {
    Dish.findByIdAndRemove(id, callback);
}

function findById(id, callback) {
    Dish.findById(id, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;
exports.update = update;
exports.remove = remove;