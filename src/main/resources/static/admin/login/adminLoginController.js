(function () {
    'use strict';

    const NOTIFICATION_MESSAGE_ERROR = "Logowanie nie powiodło się";

    let adminModule = angular.module('admin');

    adminModule.controller('adminLoginController', function ($http, $location, notificationService) {
        let self = this;

        self.credentials = {};
        self.authenticated = false;
        self.notificationMessage = "";
        self.event = null;

        authenticate();

        self.login = function ($event) {
            self.event = $event;

            $http.post('/admin/login', $.param(self.credentials), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }).then(
                function () {
                    authenticate(function () {
                        if (self.authenticated) {
                            $location.path("/admin");
                        } else {
                            $location.path("/admin/login");
                            showNotificationError();
                        }
                    });
                },
                function () {
                    $location.path("/admin/login");
                    self.authenticated = false;
                    showNotificationError();
                })
        };

        self.logout = function () {
            $http.post('logout', {}).then(
                function () {
                    self.authenticated = false;
                    $location.path("/admin/login");
                },
                function () {
                    self.authenticated = false;
                }
            )
        };

        function authenticate(callback) {
            $http.get('/api/authenticate').then(
                function (response) {
                    if (response.data.value)
                        self.authenticated = true;
                    callback && callback();
                },
                function () {
                    self.authenticated = false;
                    callback && callback();
                }
            )
        }

        function showNotificationError() {
            notificationService.showNotification(NOTIFICATION_MESSAGE_ERROR, self.event);
        }
    });
})();