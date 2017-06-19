(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('sidebarController', ['latestPosts', function (latestPosts) {

        var self = this;

        self.latest5Posts = latestPosts;
        self.urlPrefix = "post/";
    }]);
})();