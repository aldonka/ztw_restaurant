/**
 * Created by Dominika on 2016-12-27.
 */
angular.module('myApp')
    .value('DishLoc', '/dishes/:id')
    .factory('Dish', ['$resource', 'DishLoc', 'Path', 'AuthenticationService', function ($resource, DishLoc, Path, AuthenticationService) {
        return $resource(Path + DishLoc, {id: null}, {
            get: {
                method: 'GET',
                isArray: true,
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            },
            getAvaliable: {
                method: 'GET',
                isArray: true,
                url: Path + DishLoc + "/avaliable"
            },
            getById: {
                method: 'GET',
                isArray: false
            },
            create: {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            },
            update: {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            },
            delete: {
                method: 'DELETE',
                isArray: false,
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            }
        });
    }]);