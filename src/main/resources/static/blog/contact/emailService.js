(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.factory('emailService', ['$http', function ($http) {

        var restApiUrl = 'http://localhost:8080/api/email';

        return {
            send: function (from, content) {
                return $http.post(restApiUrl + '/send', content)
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