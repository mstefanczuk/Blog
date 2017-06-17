(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('PostsService', ['$http', '$q', function ($http, $q) {

        return {
            getLatest5Posts: function () {
                return $http.get('http://localhost:8080/posts/latest5')
                    .then(
                        function (response) {
                            console.info(response);
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting latest 5 posts');
                            return $q.reject(errResponse);
                        }
                    )
            }
        }
    }])
})();