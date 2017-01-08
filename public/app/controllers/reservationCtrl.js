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

        $scope.getTodayColorClass = function (date) {
            var rdate = new Date(date);
            var today = new Date();
            if (rdate.getDate() == today.getDate() &&
                rdate.getMonth() == today.getMonth() &&
                rdate.getYear() == today.getYear()) {
                return 'text-warning';
            }
            else
                return '';
        };

        $scope.reserveTable = function () {
            var d = $scope.dateTimestamp;
            var t = $scope.timeTimestamp;
            $scope.newReservation.date = new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                t.getHours() + 1,
                t.getMinutes());
            ReservationService.create($scope.newReservation, function (reservation) {
                $scope.clearData();
                InfoService.showSuccess("Utworzono rezerwacje w systemie dla: " + reservation.name + " " + reservation.surname + " na dzień: " + reservation.date.toLocaleString());
            });

        };

        $scope.clearData = function () {
            $scope.newReservation = {};
            $scope.dateTimestamp = new Date();
            $scope.timeTimestamp = new Date();
            $scope.order = [];
            $scope.newOrder = {
                order: []
            };
            $scope.wantTOrder = false;
        };

        $scope.order = [];
        $scope.addDishToOrder = function (dish) {
            var newOrder = {
                name: dish.name,
                quantity: dish.quantity
            };
            for (var i = 0; i < $scope.order.length; i++) {
                if ($scope.order[i].name == newOrder.name) {
                    InfoService.showWarning("Produkt jest już zamówiony!");
                    return;
                }
            }
            $scope.order.push(newOrder);
            $scope.newReservation.order.push(newOrder);
        };

        //    datepicker settings and functions

        $scope.options = {
            // customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.setDate = function (year, month, day) {
            $scope.dateTimestamp = new Date(year, month, day);
            console.log("new date: " + $scope.dateTimestamp);
        };

    }]);