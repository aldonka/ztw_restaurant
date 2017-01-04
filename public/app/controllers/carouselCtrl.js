/**
 * Created by Dominika on 2017-01-04.
 */
angular.module('myApp')
    .controller('carouselCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = ["app/img/slides/img05.jpg", "app/img/slides/img06.jpg", "app/img/slides/img07.jpg", "app/img/slides/img08.jpg" ];
        var currIndex = 0;

        $scope.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }
    }]);