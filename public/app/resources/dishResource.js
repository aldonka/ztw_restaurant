/**
 * Created by Dominika on 2016-12-27.
 */
angular.module('myApp')
    .value('DishLoc', '/dishes/:id')
    .factory('Dish', ['$resource', 'DishLoc', 'Path', function ($resource, DishLoc, Path) {
        return $resource(Path + DishLoc, {id: null}, {
            get : {
                method: 'GET',
                isArray : true
            },
            getById: {
                method: 'GET',
                isArray: false
            },
            create : {
                method: 'POST'
            },
            delete: {
                method: 'DELETE',
                isArray: false
            }
        });
    }]);