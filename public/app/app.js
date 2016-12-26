'use strict';
angular.module('myApp', [
  'ngRoute', 'ngResource', 'ngAnimate'
]).
config([ '$routeProvider', function( $routeProvider) {
  $routeProvider
      .when('/main', {
        templateUrl: 'app/views/main.html',
        controller: 'mainCtrl'
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
