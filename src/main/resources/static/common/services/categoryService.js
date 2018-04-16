(function () {
    'use strict';

    const REST_URL_API = 'http://localhost:8080/api/categories';
    const ERROR_MESSAGE = 'Error while getting all categories';

    let  appModule = angular.module('app');

    appModule.factory('categoryService', ['$http', function ($http) {

        let  restApiUrl = REST_URL_API;

        return {
            getAllCategories: function () {
                return $http.get(restApiUrl).then(
                    function (response) {
                        return response.data;
                    },
                    function (errRespone) {
                        console.error(ERROR_MESSAGE);
                        return errRespone.data;
                    }
                )
            }
        }
    }])
})();