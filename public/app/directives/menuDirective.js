/**
 * Created by Dominika on 2017-01-04.
 */
angular.module('myApp')
    .directive('menuCategory', ['$rootScope', function ($rootScope) {
        return {
            scope: {
                category: '@',
                dishes: "="
            },
            restrict: 'AE',
            templateUrl: 'app/views/menuCategory.html',
            link: function (scope, element, attrs) {
                scope.dishes = getDishesWithCategory(scope.category, scope.dishes);
            }
        };

        function getDishesWithCategory(category, dishes) {
            var result = [];
            console.log("here: " + dishes.length);
            for(var i=0; i< dishes.length; i++){
                if(dishes[i].category == category.toLowerCase()){
                    result.push(dishes[i]);
                }
            }
            return result;
        }
    }]);