/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .service('CommentService', ['$timeout', '$window', '$rootScope', '$location', 'Comment', 'InfoService', 'Socket', function ($timeout, $window, $rootScope, $location, Comment, InfoService, Socket) {
        return {
            create: function (comment, callback) {
                if (comment != null && comment !== undefined && comment.content.length > 0) {
                    Comment.create(comment, callback);
                    Socket.emit('comment:add', comment);
                    $window.location.reload();
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