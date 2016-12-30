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
// var jwt = require('express-jwt');
// var auth = jwt({
//     secret: 'SECRET',
//     userProperty: 'payload'
// });

function getAll (req, res) {
    dish.findAll(function (error, comments) {
        basic.handleResponse(error, comments, req, res, 'error finding dishes');
    });
}

function findByDishId(req, res){
    dish.findByDishId(req.params.id, function (error, comments) {
        basic.handleResponse(error, comments, req, res, 'error finding product id:' + req.params.id);
    })

}

function create (req, res) {
    dish.create(req.body, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error while creating reservation');
    });
}

function findById(req, res){
    dish.findById(req.params.id, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error finding comment id:' + req.params.id);
    })

}

function update(req, res){
    dish.update(req.body, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error while updating reservation id: ' + req.params.id);
    });
}

function remove(req, res) {
    dish.remove(req.params.id, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error removing reservation id: ' + req.params.id);
    });
}

router.post('/comments', create);
router.get('/comments', getAll);
router.get('/comments/:id', findById);
router.get('/comments/dish/:id', auth.auth, findByDishId);
router.put('/comments/:id', auth.auth, update);
router.delete('/comments/:id', auth.auth, remove);

module.exports = router;