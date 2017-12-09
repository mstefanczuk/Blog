(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('postHeadingsController', function (first6Posts, postService) {

        var self = this;

        self.postUrlPrefix = "post/";
        self.postPagesCounter = 1;
        self.postsHeadingsList = first6Posts;

        loadNextPostsOnScrollReachedBottom();

        function loadNextPosts() {
            postService.getNext6FromPage(self.postPagesCounter).then(
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