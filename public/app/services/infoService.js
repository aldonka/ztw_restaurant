/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .service('InfoService', ['$timeout', function ($timeout) {
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
            showInfo : function (info) {
                console.log("Tuuu info, info: " + JSON.stringify(info));
                $timeout(function () {
                    info.show = false;
                }, 3000);
            }
        }
    }]);