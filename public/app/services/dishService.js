/**
 * Created by Dominika on 2016-12-27.
 */
angular.module('myApp')
    .service('DishService', ['$timeout', '$location', '$rootScope', 'Dish', 'InfoService', function ($timeout, $location, $rootScope, Dish, InfoService) {
        return {
            create: function (dish, callback) {
                if(dish != null && dish !== undefined && dish.name.length > 0){
                    Dish.create(dish, callback);
                }
            },
            getAll: function (callback) {
                Dish.get({}, callback);
            },
            delete: function (id, callback) {
                Dish.delete({id : id}, callback);
            }
        };
    }]);