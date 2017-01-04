/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$rootScope', '$location','DishService', 'CategoriesService',  function ($scope, $rootScope, $location, DishService,CategoriesService) {
        function getAllDishes() {
            DishService.getAll(function (dishes) {
                $scope.dishes = dishes;
            });
        }
        getAllDishes();

        $scope.addDish = function () {
            DishService.create($scope.newDish, function () {
                console.log("new reservation added!");
                DishService.getAll(function (dishes) {
                    $scope.dishes = dishes;
                });
            });
        };

        $scope.categories = CategoriesService.getCategories();

        $scope.getDish = function (id) {
                $location.path("/dish/" + id);
        };

        $scope.removeDish = function (id) {
            DishService.delete(id, function (response) {
                console.log("Removed reservation: " + JSON.stringify(response));
                getAllDishes();
            })
        };

        $scope.reserveTable = function () {
            console.log("Table reserved!" + $scope.newReservation.table + " on date:" +  $scope.newReservation.date);
        };
    }]);