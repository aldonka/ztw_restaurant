/**
 * Created by Dominika on 2016-12-27.
 */
var comment = require('./model');
var dish = require('../dishes/model');
var router = require('express').Router();
var basic = require('../basic');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('../auth_config');

function getAll (req, res) {
    comment.findAll(function (error, comments) {
        basic.handleResponse(error, comments, req, res, 'error finding dishes');
    });
}

function findByDishId(req, res){
    comment.findByDishId(req.params.id, function (error, comments) {
        basic.handleResponse(error, comments, req, res, 'error finding product id:' + req.params.id);
    })

}

function create (req, res) {
    comment.create(req.body, function (error, comment) {
        recalculateDishStars(req.body.dishId, function (error, data) {
            basic.handleResponse(error, data, req, res, 'error while creating comment and updating dish rating.');
        });

    });
}

function findById(req, res){
    comment.findById(req.params.id, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error finding comment id:' + req.params.id);
    })

}

function update(req, res){
    comment.update(req.body, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error while updating reservation id: ' + req.params.id);
    });
}

function remove(req, res) {
    comment.remove(req.params.id, function (error, comment) {
        basic.handleResponse(error, comment, req, res, 'error removing reservation id: ' + req.params.id);
    });
}

function recalculateDishStars(dishId, callback) {
    comment.findByDishId(dishId,function (error, comments){
        var sum = 0, len = 0;
        for(var i =0; i < comments.length; i++){
            if(comments[i].stars != null){
                sum += comments[i].stars;
                len++;
            }
        }
        var stars = Math.round(sum/len);
            dish.updateStars(dishId, stars, function (error, newDish) {
                callback(error, newDish);
            });
    });
}

router.post('/comments', create);
router.get('/comments', getAll);
router.get('/comments/:id', findById);
router.get('/comments/dish/:id', auth.auth, findByDishId);
router.put('/comments/:id', auth.auth, update);
router.delete('/comments/:id', auth.auth, remove);

module.exports = router;