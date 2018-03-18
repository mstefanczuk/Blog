(function () {
    'use strict';

    const POST_URL_PREFIX = "post/";

    var blogModule = angular.module('blog');

    blogModule.controller('postHeadingsByCategoryController', function (first6PostsByCategory, postService, $stateParams) {

        var self = this;

        self.postUrlPrefix = POST_URL_PREFIX;
        self.postPagesCounter = 1;
        self.postsHeadingsList = first6PostsByCategory;

        loadNextPostsOnScrollReachedBottom();

        function loadNextPosts() {
            postService.getNext6ByCategoryNameUrlFromPage($stateParams.categoryNameUrl, self.postPagesCounter).then(
                function (response) {
                    self.postsHeadingsList = self.postsHeadingsList.concat(response);
                    self.postPagesCounter++;
                }
            );
        }

        function loadNextPostsOnScrollReachedBottom() {
            $(window).scroll(function () {
                if ($(window).scrollTop() === ($(document).height() - $(window).height())) {
                    loadNextPosts();
                }
            })
        }
    });
})();