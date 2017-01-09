/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('adminCtrl', ['$scope', '$rootScope', '$http', '$location', 'InfoService', 'AuthenticationService', function ($scope, $rootScope, $http, $location, InfoService, AuthenticationService) {
        $scope.users = (function () {
            $http.defaults.headers.common['Authorization'] = "Bearer " + AuthenticationService.getToken();
            $http.get('http://localhost:3000/api/users').success(function (data) {
                $scope.users = data;
            })
        })();

        $scope.registerNewUser = function () {
            if ($scope.user != null || $scope.user != undefined) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + AuthenticationService.getToken();
                return $http.post('http://localhost:3000/api/register', $scope.user).success(function (data) {
                    InfoService.showSuccess("Utworzonego nowego użytkownika serwisu: " + $scope.user.username);
                    $location.path('/admin/users');
                });
            }
        };

        $scope.login = function () {
            if ($scope.user != null || $scope.user != undefined) {
                return $http.post('http://localhost:3000/api/login', $scope.user).success(function (data) {
                    console.log("Success" + data);
                });
            }
        }

    }]);