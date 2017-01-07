/**
 * Created by Dominika on 2016-12-28.
 */
var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    date: Date,
    table: Number,
    duration: Number,
    order: Array

});

Reservation = mongoose.model('Reservation', ReservationSchema);

function findAll(callback) {
    Reservation.find(callback);
}

function create(newReservation, callback) {
    var reservation = new Reservation(newReservation);
    reservation.save(callback);
}

function update(newReservation, callback) {
    Reservation.findOneAndUpdate({_id: newReservation._id}, newReservation, callback);
}

function getFreeReservationsOnDate(reservationDate, callback){
    //TODO : on reservation form when sb choose date this is called dk
}

function remove(id, callback) {
    Reservation.findByIdAndRemove(id, callback);
}

function findById(id, callback) {
    Reservation.findById(id, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;
exports.update = update;
exports.remove = remove;
exports.getFreeReservationsOnDate = getFreeReservationsOnDate;