(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('SidebarController', ['latestPosts', function (latestPosts) {

        var self = this;

        self.latest5Posts = latestPosts;

        console.log(self.latest5Posts);
    }])
})();