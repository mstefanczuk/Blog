(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('sidebarController', function (latest5Posts) {

        var self = this;

        self.latest5Posts = latest5Posts;
        self.postUrlPrefix = "post/";
    });
})();