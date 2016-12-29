/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .service('CommentService', ['$timeout', '$location', '$rootScope', 'Comment', 'InfoService', function ($timeout, $location, $rootScope, Comment, InfoService) {
        return {
            create: function (comment, callback) {
                console.log("Comment" + JSON.stringify(comment));
                if (comment != null && comment !== undefined && comment.content.length > 0) {
                    Comment.create(comment, callback);
                }
            },
            get: function (id, callback) {
                Comment.getById({id: id}, callback);
            },
            getByDishId: function (dishId, callback) {
                Comment.getByDishId({id: dishId}, callback);
            },
            getAll: function (callback) {
                Comment.get({}, callback);
            },
            delete: function (id, callback) {
                Comment.delete({id: id}, callback);
            }
        };
    }]);