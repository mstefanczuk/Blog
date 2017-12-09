(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('categoryController', function (allCategories) {
            var self = this;

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = 'kategorie/';
        }
    );
})();