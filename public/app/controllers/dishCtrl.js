/**
 * Created by Dominika on 2016-12-29.
 */
angular.module('myApp')
    .controller('dishCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CommentService', 'Socket', 'InfoService', function ($scope, $rootScope, $location, DishService, CommentService, Socket, InfoService) {
        Socket.on('message', function(data){console.log("Socket.io msg: " + data)});

        Socket.on('comment:added', function(data){
            var urlArr = $location.url().split('/');
            var id = urlArr[urlArr.length-1];

            $scope.comments.push(data);
            if(id == data.dishId){
                InfoService.showInfo("Nowy komentarz do potrawy: " + $scope.dish.name + ",  dodany przez: " + data.author + " ocena: " + data.stars);
            }
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
            CommentService.create($scope.comment, function (newDish) {
                $scope.comments.push($scope.comment);
                $scope.dish = newDish;
                InfoService.showSuccess("Dodano komentarz");
                $scope.comment = {};
            });
        }
    }]);