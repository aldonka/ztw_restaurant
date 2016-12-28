/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$rootScope', 'DishService',  function ($scope, $rootScope, DishService) {
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

        $scope.removeDish = function (id) {
            DishService.delete(id, function (response) {
                console.log("Removed reservation: " + JSON.stringify(response));
                getAllDishes();
            })
        };

        $scope.reserveTable = function () {
            console.log("Table reserved!" + $scope.newReservation.table);
        }

    }]);