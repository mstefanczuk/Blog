(function () {
    'use strict';

    const REST_API_URL = 'http://localhost:8080/api/static-content/';
    const ERROR_MESSAGE_GET = 'Error while getting static content by name: ';
    const ERROR_MESSAGE_UPDATE = 'Error while updating static content with id: ';

    let  appModule = angular.module('app');

    appModule.factory('staticContentService', ['$http', function ($http) {

        let  restApiUrl = REST_API_URL;

        return {
            getStaticContentByName: function (name) {
                return $http.get(restApiUrl + name)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_GET + name);
                            return errResponse.data;
                        }
                    )
            },

            updateStaticContent: function (id, data) {
                return $http.put(restApiUrl + id, data)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_UPDATE + id);
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();