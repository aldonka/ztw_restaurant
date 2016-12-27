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

function getDishes (req, res) {
    dish.findAll(function (error, dishes) {
        basic.handleResponse(error, dishes, req, res, 'error finding dishes');
    });
}

function createDish (req, res) {
    dish.create(req.body, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error while creating dish');
    });
}

function findById(req, res){
    product.findById(req.params.id, function (error, product) {
        basic.handleResponse(error, product, req, res, 'error finding product id:' + req.params.id);
    })

}

function update(req, res){
    dish.update(req.body, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error while updating dish id: ' + req.params.id);
    });
}

function remove(req, res) {
    dish.remove(req.params.id, function (error, dish) {
        basic.handleResponse(error, dish, req, res, 'error removing dish id: ' + req.params.id);
    });
}

router.post('/dishes', createDish);
router.get('/dishes', getDishes);
router.get('/dishes/:id', findById);
router.put('/dishes/:id', update);
router.delete('/dishes/:id', remove);

module.exports = router;