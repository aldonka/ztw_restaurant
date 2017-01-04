/**
 * Created by Dominika on 2017-01-04.
 */
angular.module('myApp')
    .service('CategoriesService', ['$rootScope', function ($rootScope) {
        var categories = ["przystawka", "danie głóne", "zupy", "sałatki", "pizza", "deser", "kawa", "herbata i napoje"];

        return {
            getCategories: function () {
                return categories;
            }

        }
    }]);