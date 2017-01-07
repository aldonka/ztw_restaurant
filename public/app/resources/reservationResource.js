/**
 * Created by Dominika on 2017-01-07.
 */
angular.module('myApp')
    .value('ReservationLoc', '/reservations/:id')
    .factory('Reservation', ['$resource', 'ReservationLoc', 'Path', 'AuthenticationService', function ($resource, ReservationLoc, Path, AuthenticationService) {
        return $resource(Path + ReservationLoc, {id: null}, {
            get: {
                method: 'GET',
                isArray: true
            },
            getById: {
                method: 'GET',
                isArray: false
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            },
            delete: {
                method: 'DELETE',
                isArray: false,
                headers: {
                    Authorization: 'Bearer ' + AuthenticationService.getToken()
                }
            }
        });
    }]);