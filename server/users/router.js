/**
 * Created by Dominika on 2016-12-05.
 */
var user = require('./model');
var basic = require('../basic');
var passport = require('passport');
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
    user.create(req.body, function(token) {
        console.log("token:" + JSON.stringify(token));
        res.status(200);
        res.json({
            "token" : token
        });
    });
}

function login(req, res) {
    console.log("Logging user:" + req.body.username);
    // user.findByUsername(req.body, function (err, user) {
        // basic.handleResponse(err, user, req, res, 'error while creating product');
        passport.authenticate('local', function(err, user, info){
            var token;
            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }

            // If a user is found
            if(user){
                token = user.generateJWT();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    // });

}

router.get('/users', getUsers);
router.post('/login', login);
router.post('/register', register);

module.exports = router;