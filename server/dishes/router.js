/**
 * Created by Dominika on 2016-12-27.
 */
var dish = require('./model');
var router = require('express').Router();
var basic = require('../basic');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('../auth_config');

function getDishes (req, res) {
    dish.findAll(function (error, dishes) {
        basic.handleResponse(error, dishes, req, res, 'error finding dishes');
    });
}

function getAvaliableDishes (req, res) {
    dish.findAllAvaliable(function (error, dishes) {
        basic.handleResponse(error, dishes, req, res, 'error finding avaliable dishes');
    });
}

function createDish (req, res) {
    dish.create(req.body, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error while creating reservation');
    });
}

function findById(req, res){
    dish.findById(req.params.id, function (error, data) {
        basic.handleResponse(error, data, req, res, 'error finding product id:' + req.params.id);
    })

}

function update(req, res){
    dish.update(req.body, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error while updating reservation id: ' + req.params.id);
    });
}

function remove(req, res) {
    dish.remove(req.params.id, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error removing reservation id: ' + req.params.id);
    });
}

router.post('/dishes', auth.auth, createDish);
router.get('/dishes', auth.auth, getDishes);
router.get('/dishes/avaliable', getAvaliableDishes);
router.get('/dishes/:id', findById);
router.put('/dishes/:id', auth.auth, update);
router.delete('/dishes/:id', auth.auth, remove);

module.exports = router;