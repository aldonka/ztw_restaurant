/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('adminCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.users = [{
            username: "Admin",
            role: "admin",
            lastLogIn: "20-12-2016 16:00"
        }];

        $scope.registerNewUser = function () {
            if($scope.user != null || $scope.user != undefined){
                console.log('User register' + JSON.stringify($scope.user));
            }
        };
    }]);