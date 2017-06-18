(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('postsService', ['$http', '$q', function ($http, $q) {

        return {
            getLatest5Posts: function () {
                return $http.get('http://localhost:8080/api/posts/latest5')
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting latest 5 posts');
                            return $q.reject(errResponse);
                        }
                    )
            },

            getPostById: function (id) {
                return $http.get('http://localhost:8080/api/posts/' + id)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            return $q.reject(errResponse);
                        }
                    )
            }
        }
    }])
})();