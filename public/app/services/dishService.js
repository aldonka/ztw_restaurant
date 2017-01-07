/**
 * Created by Dominika on 2016-12-27.
 */
angular.module('myApp')
    .service('DishService', ['$timeout', '$location', '$rootScope', 'Dish', 'InfoService', 'Socket', function ($timeout, $location, $rootScope, Dish, InfoService, Socket) {
        var allergens = [ 'mleko', 'gluten', 'orzechy'];
        var ingradients = ['warzywa', 'owoce', 'mleko', 'toffi', 'makaron', 'ryż', 'kasza jaglana'];

        return {
            create: function (dish, callback) {
                if(dish != null && dish !== undefined && dish.name.length > 0){
                    Dish.create(dish, callback);
                    Socket.emit('dish:add', dish);
                }
            },
            get: function (id, callback) {
                Dish.getById({id: id}, callback);
            },
            getAll: function (callback) {
                Dish.get({}, callback);
            },
            getAllAvaliable: function (callback) {
                Dish.getAvaliable({}, callback);
            },
            update: function (dish, callback) {

                Dish.update({id: dish._id}, dish, function (dish) {
                    Socket.emit('dish:modify', dish);
                    callback(dish);
                } );
            },
            delete: function (id, callback) {
                Dish.delete({id : id}, callback);
            },
            getAllergens: function () {
                return allergens;
            },
            getIngradients: function () {
                return ingradients;
            }
        };
    }]);