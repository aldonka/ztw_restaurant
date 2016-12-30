/**
 * Created by Dominika on 2016-12-30.
 */
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

exports.auth = auth;