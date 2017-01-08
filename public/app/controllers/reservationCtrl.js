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
        $scope.dateTimestamp = new Date();
        $scope.timeTimestamp = new Date();

        $scope.reserveTable = function () {
            var d =$scope.dateTimestamp;
            var t =$scope.timeTimestamp;
            $scope.newReservation.date = new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                t.getHours() + 1,
                t.getMinutes());
            ReservationService.create($scope.newReservation, function (reservation) {
                $scope.newReservation = {};
                $scope.dateTimestamp = new Date();
                $scope.timeTimestamp = new Date();
                InfoService.showSuccess("Utworzono rezerwacje w systemie dla: " + reservation.name + " " + reservation.surname + " na dzień: " + reservation.date.toLocaleString() );
            });

        };

    //    datepicker settings and functions

        $scope.options = {
            // customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.setDate = function(year, month, day) {
            $scope.dateTimestamp = new Date(year, month, day);
            console.log("new date: " + $scope.dateTimestamp);
        };

    }]);