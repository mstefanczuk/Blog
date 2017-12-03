(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('postDetailsController', function (postDetails) {
        var self = this;

        self.postsByCategoryUrlPrefix = 'kategorie/';

        self.postTitle = postDetails.title;
        self.postDate = formatDate(new Date(postDetails.date));
        self.postBody = postDetails.body;
        self.postAuthor = postDetails.author.fullName;
        self.postCategoryName = postDetails.category.name;
        self.postCategoryUrl = postDetails.category.nameUrl;
    });

    function formatDate(date) {
        var monthNames = ["Stycznia", "Lutego", "Marca", "Kwietnia",
            "Maja", "Czerwca", "Lipca", "Sierpnia",
            "Września", "Października", "Listopada", "Grudnia"];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
})();