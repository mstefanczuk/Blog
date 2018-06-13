(function () {
    'use strict';

    const REST_API_URL = 'http://localhost:8080/api/users/';
    const DEFAULT_ADMIN_USERNAME = 'stefan';
    const CHANGE_ADMIN_PASS_SUFFIX = '/change-password';
    const ERROR_MESSAGE_CHANGE_ADMIN_PASS = 'Error while changing admin password';

    let  appModule = angular.module('app');

    appModule.factory('userService', ['$http', function ($http) {

        let  restApiUrl = REST_API_URL;

        return {
            changeAdminPassword: function (data) {
                return $http.post(restApiUrl + DEFAULT_ADMIN_USERNAME + CHANGE_ADMIN_PASS_SUFFIX, data)
                    .then(
                        function (response) {
                            return response;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_CHANGE_ADMIN_PASS);
                            return errResponse;
                        }
                    )
            }
        };
    }])
})();