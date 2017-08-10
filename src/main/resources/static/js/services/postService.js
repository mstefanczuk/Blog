(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('postService', ['$http', '$q', function ($http, $q) {

        return {
            getLatest5Posts: function () {
                return $http.get('http://localhost:8080/api/posts/latest5')
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting latest 5 posts');
                            return errResponse.data;
                        }
                    )
            },

            getLatest6FromPage: function (page) {
                return $http.get('http://localhost:8080/api/posts/latest6FromPage?page=' + page)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting next 6 posts');
                            return errResponse.data;
                        }
                    );
            },

            getPostById: function (id) {
                return $http.get('http://localhost:8080/api/posts/id/' + id)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting post by id: ' + id);
                            return errResponse.data;
                        }
                    )
            },

            getPostByTitleUrl: function (titleUrl) {
                return $http.get('http://localhost:8080/api/posts/title/' + titleUrl)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting post by titleUrl: ' + titleUrl);
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();