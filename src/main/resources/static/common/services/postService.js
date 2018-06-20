(function () {
    'use strict';

    const REST_API_URL = 'http://localhost:8080/api/posts/';
    const LATEST5_URL_SUFFIX = 'latest5/';
    const TOP_POSTS_URL_SUFFIX = 'top/';
    const FIRST5_TOP_URL_SUFFIX = 'first5/';
    const PAGE_URL_SUFFIX = 'page/';
    const CATEGORY_URL_SUFFIX = 'category/';
    const TITLE_URL_SUFFIX = 'title/';
    const ERROR_MESSAGE_LATEST5 = 'Error while getting latest 5 posts';
    const ERROR_MESSAGE_NEXT6 = 'Error while getting next 6 posts';
    const ERROR_MESSAGE_NEXT6_BY_CATEGORY = 'Error while getting next 6 posts by category ';
    const ERROR_MESSAGE_FIRST5_TOP = 'Error while getting first 5 top posts';
    const ERROR_MESSAGE_NEXT6_TOP = 'Error while getting next 6 top posts';
    const ERROR_MESSAGE_TITLE_URL = 'Error while getting post by titleUrl: ';
    const ERROR_MESSAGE_UPDATE = 'Error while updating post with id ';
    const ERROR_MESSAGE_CREATE = 'Error while creating post';
    const ERROR_MESSAGE_DELETE = 'Error while deleting post';


    let appModule = angular.module('app');

    appModule.factory('postService', ['$http', function ($http) {

        let restApiUrl = REST_API_URL;

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
                return $http.get(restApiUrl + CATEGORY_URL_SUFFIX + categoryName + '/' + PAGE_URL_SUFFIX + page)
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
            },

            getFirst5TopPosts: function () {
                return $http.get(restApiUrl + TOP_POSTS_URL_SUFFIX + FIRST5_TOP_URL_SUFFIX)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_FIRST5_TOP);
                            return errResponse.data;
                        }
                    )
            },

            getNext6ByTopTrueFromPage: function (page) {
                return $http.get(restApiUrl + TOP_POSTS_URL_SUFFIX + PAGE_URL_SUFFIX + page)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error(ERROR_MESSAGE_NEXT6_TOP);
                            return errResponse.data;
                        }
                    );
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
            },

            delete: function (id) {
                return $http.delete(restApiUrl + id).then(
                    function (response) {
                        return response;
                    },
                    function (errRespone) {
                        console.error(ERROR_MESSAGE_DELETE);
                        return errRespone;
                    }
                )
            }
        };
    }])
})();