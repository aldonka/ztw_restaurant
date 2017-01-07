/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .service('InfoService', ['$timeout','$rootScope', function ($timeout, $rootScope) {

        var info = {
            msg : "test",
            show : false,
            cssClass : "alert-info"
        };

        return {
            getInfo : function (msg) {
                info.msg = msg;
                info.show = true;
                return info;
            },
            getWarning : function (msg) {
                var info = this.getInfo(msg);
                info.cssClass = "alert-warning";
                return info;
            },
            getError : function (msg) {
                var info = this.getInfo(msg);
                info.cssClass = "alert-danger";
                return info;
            },
            getSuccess : function (msg) {
                var info = this.getInfo(msg);
                info.cssClass = "alert-success";
                return info;
            },
            show : function (info) {
                $timeout(function () {
                    info.show = false;
                }, 3000);
            },
            showInfo : function (info) {
                $rootScope.info = this.getInfo(info);
                this.show($rootScope.info);
            },
            showSuccess: function (info) {
                $rootScope.info = this.getSuccess(info);
                this.show($rootScope.info);
            },
            showWarning: function (info) {
                $rootScope.info = this.getWarning(info);
                console.log("Tuuu info, info: " + JSON.stringify(info));
                this.show($rootScope.info);
            },
            showError: function (info) {
                $rootScope.info = this.getError(info);
                this.show($rootScope.info);
            }
        };
    }]);