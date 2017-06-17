(function () {
    'use strict';

    var app = angular.module('blog');

    app.controller('SidebarController', ['latestPosts', function (latestPosts) {

        var self = this;

        self.latest5Posts = latestPosts;

        console.log(self.latest5Posts);
    }])
})();