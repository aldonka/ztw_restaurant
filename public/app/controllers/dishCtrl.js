/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .controller('dishCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CommentService', 'Socket', function ($scope, $rootScope, $location, DishService, CommentService, Socket) {
        Socket.on('message', function(data){console.log("Socket.io msg: " + data)});

        Socket.on('comment:added', function(data){
            $scope.comments.push(data);
        });

        (function () {
            var urlArr = $location.url().split('/');
            var id = urlArr[urlArr.length-1];
            DishService.get(id, function (dish) {
                console.log(JSON.stringify(dish));
                $scope.dish = dish;
                $scope.updateComments();
            })
        })();

        $scope.updateComments = function () {
            CommentService.getByDishId($scope.dish._id,function (comments) {
                $scope.comments = comments;
            });
        };

        $scope.addComment = function () {
            console.log(JSON.stringify($scope.comment));
            $scope.comment.dishId = $scope.dish._id;
            CommentService.create($scope.comment, function (comment) {
                console.log("Comment added");
            });
        }
    }]);