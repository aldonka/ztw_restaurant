/**
 * Created by Dominika on 2016-12-27.
 */
var dataModel = require('./model');
var router = require('express').Router();
var basic = require('../basic');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('../auth_config');

function getAll (req, res) {
    dataModel.findAll(function (error, dataArr) {
        basic.handleResponse(error, dataArr, req, res, 'error finding orders');
    });
}

function create (req, res) {
    dataModel.create(req.body, function (error, data) {
        basic.handleResponse(error, data, req, res, 'error while creating order');
    });
}

function findById(req, res){
    dataModel.findById(req.params.id, function (error, data) {
        basic.handleResponse(error, data, req, res, 'error finding order id:' + req.params.id);
    })

}

function update(req, res){
    dataModel.update(req.body, function (error, data) {
        basic.handleResponse(error, data, req, res, 'error while updating order id: ' + req.params.id);
    });
}

function remove(req, res) {
    dataModel.remove(req.params.id, function (error, data) {
        basic.handleResponse(error, data, req, res, 'error removing order id: ' + req.params.id);
    });
}
var pathName = '/orders';

router.post(pathName , auth.auth, create);
router.get(pathName, getAll);
router.get(pathName + '/:id', findById);
router.put(pathName + '/:id', auth.auth, update);
router.delete(pathName + '/:id', auth.auth, remove);

module.exports = router;