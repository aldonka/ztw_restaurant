/**
 * Created by Dominika on 2016-12-26.
 */
angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$rootScope', '$location', 'DishService', 'CategoriesService', 'InfoService', 'Socket', '$window', function ($scope, $rootScope, $location, DishService, CategoriesService, InfoService, Socket, $window) {
        Socket.on('dish:added', function(data){
            InfoService.showInfo("Dodano nową potrawe: " + data.name);
            getAllDishes();

        });
        Socket.on('dish:modified', function(data){
            InfoService.showInfo("Właśnie zmodyfikowano potrawę: " + data.name);
            getAllDishes();
            $window.location.reload();
        });

        function getAllDishes() {
            DishService.getAllAvaliable(function (dishes) {
                $scope.dishes = dishes;
            });
        }
        getAllDishes();

        $scope.ingradients = DishService.getIngradients();
        $scope.allergens = DishService.getAllergens();
        $scope.categories = (function(){
            var categories = CategoriesService.getCategories();
            $scope.style = [];
            for(var i = 0; i < categories.length; i++){
                $scope.style.push({
                    category : categories[i],
                    show : true,
                    glyphicon : 'glyphicon-ok',
                    btn: 'btn-info'
                });
            }
            return categories;
        })();

        $scope.changeCategoryState = function(category){
            for(var i = 0; i < $scope.style.length; i++){
                var item = $scope.style[i];
                if(item.category == category){
                    item.show = !item.show;
                    if(item.show){
                        item.glyphicon = 'glyphicon-ok';
                        item.btn = 'btn-info';
                    }else{
                        item.glyphicon = 'glyphicon-remove';
                        item.btn = 'btn-default';
                    }
                }
            }
        };

        $scope.getDish = function (id) {
            $location.path("/dish/" + id);
        };


    }]);