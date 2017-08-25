(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('categoryController', function (allCategories) {
            var self = this;

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = 'kategorie/';
        }
    );
})();