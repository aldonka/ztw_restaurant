/**
 * Created by Dominika on 2017-01-07.
 */
angular.module('myApp')
    .controller('adminMenuCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CategoriesService', 'InfoService', '$location', 'Socket', function ($scope, $rootScope, $location, DishService, CategoriesService, InfoService, $location) {
        function getAllDishes() {
            DishService.getAll(function (dishes) {
                $scope.dishes = dishes;
            });
        }
        getAllDishes();

        $scope.showRemoveBtns = false;
        $scope.modifiedDish = {};
        $scope.allergens = DishService.getAllergens();
        $scope.categories = CategoriesService.getCategories();

        $scope.addDish = function () {
            DishService.create($scope.newDish, function () {
                InfoService.showSuccess("Utworzono nowa potrawe : " + $scope.newDish.name);
                console.log(JSON.stringify($scope.newDish));
                DishService.getAll(function (dishes) {
                    $scope.dishes = dishes;
                    $location.path('/menu');
                });
            });
        };

        $scope.prepareModify = function (dishId, index) {
            $scope.modifiedDish= $scope.dishes[index];

        };

        $scope.modifyDish = function () {
            DishService.update($scope.modifiedDish, function (dish) {
                getAllDishes();
                $scope.modifiedDish = {};
                InfoService.showSuccess("Zmodyfikowano potrawe : " + dish.name);
            })
        };

        $scope.removeDish = function (id) {
            DishService.delete(id, function (response) {
                console.log("Removed reservation: " + JSON.stringify(response));
                getAllDishes();
            })
        };

        $scope.checkAllergen = function (obj, index) {
            var allergenIndex = arrContainsElem(obj.allergens, $scope.allergens[index]);
            if (allergenIndex == -1) {
                obj.allergens.push($scope.allergens[index]);
                console.log("Allergeny: " + obj.allergens);
            }else{
                obj.allergens.splice(allergenIndex, 1);
                console.log("Allergeny: " + obj.allergens);
            }
        };

        function arrContainsElem(arr, elem) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == elem) {
                    return i;
                }
            }
            return -1;
        }

    }]);