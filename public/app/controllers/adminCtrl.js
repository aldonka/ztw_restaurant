/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('adminCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.users = (function () {
            $http.get('http://localhost:3000/api/users').success(function(data){
                $scope.users = data;
            })
        })();

        $scope.registerNewUser = function () {
            if($scope.user != null || $scope.user != undefined){
                console.log('User register' + JSON.stringify($scope.user));
                return $http.post('http://localhost:3000/api/register', $scope.user).success(function(data){
                    console.log(data.token);
                });
            }
        };

        $scope.login = function () {
            if($scope.user != null || $scope.user != undefined){
                console.log('User register' + JSON.stringify($scope.user));
                return $http.post('http://localhost:3000/api/login', $scope.user).success(function(data){
                    console.log("Success" + data);
                });
            }
        }

    }]);