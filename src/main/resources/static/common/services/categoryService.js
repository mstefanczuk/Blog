(function () {
    'use strict';

    var appModule = angular.module('app');

    appModule.factory('categoryService', ['$http', function ($http) {

        var restApiUrl = 'http://localhost:8080/api/categories';

        return {
            getAllCategories: function () {
                return $http.get(restApiUrl).then(
                    function (response) {
                        return response.data;
                    },
                    function (errRespone) {
                        console.error('Error while getting all categories');
                        return errRespone.data;
                    }
                )
            }
        }
    }])
})();