(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('postsController', ['postDetails', function (postDetails) {
        var self = this;

        self.postTitle = postDetails.title;
        self.postDate = formatDate(new Date(postDetails.date));
        self.postBody = postDetails.body;
    }]);

    function formatDate(date) {
        var monthNames = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia",
            "Września", "Października", "Listopada", "Grudnia"];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
})();