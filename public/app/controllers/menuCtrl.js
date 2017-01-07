/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CategoriesService', 'InfoService', '$location', function ($scope, $rootScope, $location, DishService, CategoriesService, InfoService, $location) {
        function getAllDishes() {
            DishService.getAllAvaliable(function (dishes) {
                $scope.dishes = dishes;
            });
        }
        getAllDishes();

        $scope.ingradients = DishService.getIngradients();
        $scope.allergens = DishService.getAllergens();
        $scope.categories = CategoriesService.getCategories();

        $scope.getDish = function (id) {
            $location.path("/dish/" + id);
        };


        $scope.reserveTable = function () {
            console.log("Table reserved!" + $scope.newReservation.table + " on date:" + $scope.newReservation.date);
        };

    }]);