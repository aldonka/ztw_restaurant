/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .value('CommentsLoc', '/comments/:id')
    .factory('Comment', ['$resource', 'CommentsLoc', 'Path', 'AuthenticationService', function ($resource, CommentsLoc, Path, AuthenticationService) {
        return $resource(Path + CommentsLoc, {id: null}, {
            get : {
                method: 'GET',
                isArray : true
            },
            getById: {
                method: 'GET',
                isArray: false
            },
            getByDishId: {
                method: 'GET',
                url: Path + '/comments/dish/:id',
                isArray: true
            },
            create : {
                method: 'POST'
            },
            delete: {
                method: 'DELETE',
                isArray: false,
                headers: {
                    Authorization: 'Bearer '+ AuthenticationService.getToken()
                }
            }
        });
    }]);