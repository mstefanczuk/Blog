(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.factory('postService', ['$http', function ($http) {

        var restApiUrl = 'http://localhost:8080/api/posts';

        return {
            getLatest5Posts: function () {
                return $http.get(restApiUrl + '/latest5')
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
                return $http.get(restApiUrl + '/page/' + page)
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
                return $http.get(restApiUrl + '/category/' + categoryName + '/page/' + page)
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

            getPostByTitleUrl: function (titleUrl) {
                return $http.get(restApiUrl + '/title/' + titleUrl)
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