/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .value('CommentsLoc', '/comments/:id')
    .factory('Comment', ['$resource', 'CommentsLoc', 'Path', function ($resource, CommentsLoc, Path) {
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
                isArray: false
            }
        });
    }]);