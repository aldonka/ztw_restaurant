/**
 * Created by Dominika on 2017-01-07.
 */
angular.module('myApp')
    .controller('reservationCtrl', ['$scope', '$rootScope', '$location', 'ReservationService', 'Socket', 'InfoService', function ($scope, $rootScope, $location, ReservationService, Socket, InfoService) {
        function getReservations() {
            ReservationService.getAll(function (reservations) {
                console.log("Reservations: " + JSON.stringify(reservations));
                $scope.reservations = reservations;
            });
        }

        getReservations();
    }]);