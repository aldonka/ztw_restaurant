/**
 * Created by Dominika on 2016-12-05.
 */
var user = require('./model');
var basic = require('../basic');
var router = require('express').Router();

function getUsers(req, res) {
    user.findAll(function (error, users) {
        if (error) {
            log.error(error, 'error finding categories');
            res.status(500).send(error);
            return
        }
        res.status(200).json(users)
    });
}

function findByLogin(req, res) {
    user.findById(req.param("login"))
}

function register(req, res) {
    user.create(req.body, function (error, user) {
        basic.handleResponse(error, user, req, res, 'error while creating product');
    })
}

function login(req, res) {
    console.log("Logging user:" + req.body.username);
    var login = req.body.username;
    var password = req.body.password;
    user.findByUsername(req.body, function (error, user) {
        basic.handleResponse(error, user, req, res, 'error while creating product');
    });
}

router.get('/users', getUsers);
router.post('/login', login);

module.exports = router;