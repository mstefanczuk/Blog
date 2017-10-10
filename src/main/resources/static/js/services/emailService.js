(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('emailService', ['$http', function ($http) {

        return {
            send: function (from, content) {
                return $http.post('http://localhost:8080/api/email/send', content)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while sending an email');
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();