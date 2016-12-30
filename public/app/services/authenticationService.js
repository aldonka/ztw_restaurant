/**
 * Created by Dominika on 2016-12-30.
 */
angular.module('myApp')
    .service('AuthenticationService', ['$timeout', '$window', '$rootScope', '$location', '$window', '$http', 'Path', function ($timeout, $window, $rootScope, $location, $window, $http, Path) {

        var tokenName = 'restaurant-token';

        var saveToken = function (token) {
            $window.localStorage[tokenName] = token;
        };

        var getToken = function () {
            return $window.localStorage[tokenName];
        };

        var logout = function () {
            $window.localStorage.removeItem(tokenName);
        };

        var isLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    username: payload.username,
                    role: payload.role,
                    lastLogin: payload.lastLogin
                };
            }
        };

        var register = function (user) {
            return $http.post(Path + '/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        var login = function (user) {
            return $http.post(Path + '/login', user).success(function (data) {
                saveToken(data.token);
            });
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            register: register,
            login: login
        };
    }]);