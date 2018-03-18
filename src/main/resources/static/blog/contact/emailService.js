(function () {
    'use strict';

    const REST_API_URL = 'http://localhost:8080/api/email';
    const SEND_URL_SUFFIX = '/send';
    const ERROR_MESSAGE = 'Error while sending an email';

    var blogModule = angular.module('blog');

    blogModule.factory('emailService', ['$http', function ($http) {

        return {
            send: function (from, content) {
                return $http.post(REST_API_URL + SEND_URL_SUFFIX, content)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE);
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();