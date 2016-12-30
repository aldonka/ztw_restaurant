/**
 * Created by Dominika on 2016-12-28.
 */
var reservation = require('./model');
var router = require('express').Router();
var basic = require('../basic');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('../auth_config');

function getReservations (req, res) {
    reservation.findAll(function (error, reservations) {
        basic.handleResponse(error, reservations, req, res, 'error finding reservations');
    });
}

function createReservation(req, res) {
    reservation.create(req.body, function (error, reservation) {
        basic.handleResponse(error, reservation, req, res, 'error while creating reservation');
    });
}

function findById(req, res){
    reservation.findById(req.params.id, function (error, reservation) {
        basic.handleResponse(error, reservation, req, res, 'error finding reservation id:' + req.params.id);
    })

}

function update(req, res){
    reservation.update(req.body, function (error, reservation) {
        basic.handleResponse(error, reservation, req, res, 'error while updating reservation id: ' + req.params.id);
    });
}

function remove(req, res) {
    reservation.remove(req.params.id, function (error, reservation) {
        basic.handleResponse(error, reservation, req, res, 'error removing reservation id: ' + req.params.id);
    });
}

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.get('/reservations/:id', findById);
router.put('/reservations/:id', auth.auth, update);
router.delete('/reservations/:id', auth.auth, remove);

module.exports = router;