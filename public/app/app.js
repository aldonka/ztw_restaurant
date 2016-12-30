'use strict';
angular.module('myApp', [
    'ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'uiBootstrapCtrl'
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
            controller: 'mainCtrl'
        })
        .when('/reservation', {
            templateUrl: 'app/views/reservation.html',
            controller: 'menuCtrl'
        })
        .when('/menu', {
            templateUrl: 'app/views/menu.html',
            controller: 'menuCtrl'
        })
        .when('/dish/:id', {
            templateUrl: 'app/views/dish.html',
            controller: 'dishCtrl'
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
}])
    .run(['$rootScope', '$location', 'AuthenticationService', function ($rootScope, $location, AuthenticationService) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path().indexOf("admin") > -1 && !AuthenticationService.isLoggedIn() && !$rootScope.isAdmin()) {
                $location.path('/menu');
            }
        });

        $rootScope.logout = function () {
            AuthenticationService.logout();
        };
        $rootScope.isAdmin = function () {
            var user = AuthenticationService.currentUser();
            if(user !== undefined || user != null){
                console.log("is admin? " + user.role.toLowerCase() + " " + (user.role.toLowerCase() == 'admin'));
                return user.role.toLowerCase() == 'admin';
            }
            return false;

        };
        $rootScope.isLoggedIn = function () {
            return AuthenticationService.isLoggedIn();
        }
    }]);
