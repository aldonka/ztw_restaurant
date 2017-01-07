/**
 * Created by Dominika on 2017-01-07.
 */
angular.module('myApp')
    .service('ReservationService', ['$timeout', '$location', '$rootScope', 'Reservation', 'InfoService', function ($timeout, $location, $rootScope, Reservation, InfoService) {
        return {
            create: function (reservation, callback) {
                if(reservation != null && reservation !== undefined && reservation.name.length > 0){
                    Reservation.create(reservation, callback);
                }
            },
            get: function (id, callback) {
                Reservation.getById({id: id}, callback);
            },
            getAll: function (callback) {
                Reservation.get({}, callback);
            },
            delete: function (id, callback) {
                Reservation.delete({id : id}, callback);
            }
        };
    }]);