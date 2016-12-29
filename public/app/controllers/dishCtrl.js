/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .controller('dishCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CommentService', function ($scope, $rootScope, $location, DishService, CommentService) {
        (function () {
            var urlArr = $location.url().split('/');
            var id = urlArr[urlArr.length-1];
            DishService.get(id, function (dish) {
                console.log(JSON.stringify(dish));
                $scope.dish = dish;
                // $location.path("/dish/" + id);
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