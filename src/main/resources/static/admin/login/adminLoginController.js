(function () {
    'use strict';

    let adminModule = angular.module('admin');

    adminModule.controller('adminLoginController', function ($http, $location) {
        let self = this;

        self.credentials = {};
        self.error = false;
        self.authenticated = false;

        authenticate();

        self.login = function () {
            $http.post('/admin/login', $.param(self.credentials), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }).then(
                function () {
                    authenticate(function () {
                        if (self.authenticated) {
                            $location.path("/admin");
                            self.error = false;
                        } else {
                            $location.path("/admin/login");
                            self.error = true;
                        }
                    });
                },
                function () {
                    $location.path("/admin/login");
                    self.error = true;
                    self.authenticated = false;
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
    });
})();