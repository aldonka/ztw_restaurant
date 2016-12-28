'use strict';
angular.module('myApp', [
    'ngRoute', 'ngResource', 'ngAnimate'
])
    .value('Path', 'http://localhost:3000/api')
    .value('SocketPath', 'http://localhost:3880')
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'app/views/main.html',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'app/views/login.html',
            controller: 'adminCtrl'
        })
        .when('/menu', {
            templateUrl: 'app/views/menu.html',
            controller: 'menuCtrl'
        })
        .when('/admin/menu/add', {
            templateUrl: 'app/views/admin/menu_add.html',
            controller: 'menuCtrl'
        })
        .when('/admin/menu/modify', {
            templateUrl: 'app/views/admin/menu_modify.html',
            controller: 'menuCtrl'
        })
        .when('/admin/register', {
            templateUrl: 'app/views/admin/register.html',
            controller: 'adminCtrl'
        })
        .when('/admin/users', {
            templateUrl: 'app/views/admin/users.html',
            controller: 'adminCtrl'
        })
        .otherwise({
            redirectTo: '/main'
        });
}]);
