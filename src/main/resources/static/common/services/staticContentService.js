(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.factory('staticContentService', ['$http', function ($http) {

        var restApiUrl = 'http://localhost:8080/api/static-content/';

        return {
            getStaticContentByName: function (name) {
                return $http.get(restApiUrl + name)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting static content by name:' + name);
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();