/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CategoriesService', 'InfoService', 'Socket', '$location', function ($scope, $rootScope, $location, DishService, CategoriesService, InfoService, Socket, $location) {
        Socket.on('dish:added', function(data){
            InfoService.showInfo("Dodano nową potrawe: " + data.name);
            getAllDishes();
        });
        Socket.on('dish:modified', function(data){
            InfoService.showInfo("Właśnie zmodyfikowano potrawę: " + data.name);
            getAllDishes();
        });

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