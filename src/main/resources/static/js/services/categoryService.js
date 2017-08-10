(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('categoryService', ['$http', '$q', function ($http, $q) {

        return {
            getAllCategories: function () {
                return $http.get('http://localhost:8080/api/categories/all').then(
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