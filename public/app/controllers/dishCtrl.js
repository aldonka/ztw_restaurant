/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .controller('dishCtrl', ['$scope', '$rootScope', '$location', 'DishService', function ($scope, $rootScope, $location, DishService) {
        $scope.comments = [];
        $scope.getDish = (function () {
            var urlArr = $location.url().split('/');
            var id = urlArr[urlArr.length-1];
            DishService.get(id, function (dish) {
                console.log(JSON.stringify(dish));
                $scope.dish = dish;
                $location.path("/dish/" + id);
            })

        })();
    }]);