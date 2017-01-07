/**
 * Created by Dominika on 2017-01-04.
 */
angular.module('myApp')
    .directive('menuCategory', ['$rootScope', '$location','DishService', function ($rootScope, $location, DishService) {
        return {
            scope: {
                category: '@',
                dishes: "="
            },
            restrict: 'AE',
            templateUrl: 'app/views/menuCategory.html',
            controller: function ($scope) {
                $scope.getDish = function (id) {
                    console.log("Here get dish:" + id);
                    $location.path("/dish/" + id);
                }
            },
            compile: function (element, attrs) {
                return {
                    pre: function preLink( scope, element, attributes ) {
                        DishService.getAll(function (data) {
                            scope.dishes = getDishesWithCategory(scope.category,data);
                        });
                    }
                };
            }
        };

        function getDishesWithCategory(category, dishes) {
            var result = [];
            for(var i=0; i< dishes.length; i++){
                if(dishes[i].category == category.toLowerCase()){
                    result.push(dishes[i]);
                }
            }
            return result;
        }
    }]);