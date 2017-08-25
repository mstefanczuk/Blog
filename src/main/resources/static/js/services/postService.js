(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.factory('postService', ['$http', function ($http) {

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

            getNext6FromPage: function (page) {
                return $http.get('http://localhost:8080/api/posts/page/' + page)
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

            getNext6ByCategoryNameUrlFromPage: function (categoryName, page) {
                return $http.get('http://localhost:8080/api/posts/category/' + categoryName + '/page/' + page)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while getting next 6 posts by category ' + categoryName);
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