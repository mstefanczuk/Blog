(function () {
    'use strict';

    const REST_URL_API = 'http://localhost:8080/api/categories/';
    const ERROR_MESSAGE_GET_ALL = 'Error while getting all categories';
    const ERROR_MESSAGE_UPDATE = 'Error while updating category with id ';
    const ERROR_MESSAGE_CREATE = 'Error while creating category';

    let appModule = angular.module('app');

    appModule.factory('categoryService', ['$http', function ($http) {

        let restApiUrl = REST_URL_API;

        return {
            getAllCategories: function () {
                return $http.get(restApiUrl).then(
                    function (response) {
                        return response.data;
                    },
                    function (errRespone) {
                        console.error(ERROR_MESSAGE_GET_ALL);
                        return errRespone.data;
                    }
                )
            },

            update: function (id, data) {
                return $http.put(restApiUrl + id, data).then(
                    function (response) {
                        return response.data;
                    },
                    function (errRespone) {
                        console.error(ERROR_MESSAGE_UPDATE + id);
                        return errRespone.data;
                    }
                )
            },

            create: function (data) {
                return $http.post(restApiUrl, data).then(
                    function (response) {
                        return response.data;
                    },
                    function (errRespone) {
                        console.error(ERROR_MESSAGE_CREATE);
                        return errRespone.data;
                    }
                )
            }
        }
    }])
})();