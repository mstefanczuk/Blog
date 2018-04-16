(function () {
    'use strict';

    const REST_API_URL = 'http://localhost:8080/api/posts';
    const LATEST5_URL_SUFFIX = '/latest5';
    const PAGE_URL_SUFFIX = '/page/';
    const CATEGORY_URL_SUFFIX = '/category/';
    const TITLE_URL_SUFFIX = '/title/';
    const ERROR_MESSAGE_LATEST5 = 'Error while getting latest 5 posts';
    const ERROR_MESSAGE_NEXT6 = 'Error while getting next 6 posts';
    const ERROR_MESSAGE_NEXT6_BY_CATEGORY = 'Error while getting next 6 posts by category ';
    const ERROR_MESSAGE_TITLE_URL = 'Error while getting post by titleUrl: ';

    let  appModule = angular.module('app');

    appModule.factory('postService', ['$http', function ($http) {

        let  restApiUrl = REST_API_URL;

        return {
            getLatest5Posts: function () {
                return $http.get(restApiUrl + LATEST5_URL_SUFFIX)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_LATEST5);
                            return errResponse.data;
                        }
                    )
            },

            getNext6FromPage: function (page) {
                return $http.get(restApiUrl + PAGE_URL_SUFFIX + page)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_NEXT6);
                            return errResponse.data;
                        }
                    );
            },

            getNext6ByCategoryNameUrlFromPage: function (categoryName, page) {
                return $http.get(restApiUrl + CATEGORY_URL_SUFFIX + categoryName + PAGE_URL_SUFFIX + page)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_NEXT6_BY_CATEGORY + categoryName);
                            return errResponse.data;
                        }
                    );
            },

            getPostByTitleUrl: function (titleUrl) {
                return $http.get(restApiUrl + TITLE_URL_SUFFIX + titleUrl)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_TITLE_URL + titleUrl);
                            return errResponse.data;
                        }
                    )
            }
        };
    }])
})();