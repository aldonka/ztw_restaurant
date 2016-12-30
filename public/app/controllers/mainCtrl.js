/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', '$location','AuthenticationService', function ($scope, $rootScope, $location, AuthenticationService) {
        $scope.basic = "Basic view";

        $scope.login = function () {
            if ($scope.user != null || $scope.user != undefined) {
                console.log('User register' + JSON.stringify($scope.user));
                AuthenticationService
                    .login($scope.user)
                    .error(function (error) {
                        console.log("Error");
                    })
                    .then(function () {
                        $location.path('menu');
                    });
            }
        }
    }]);
