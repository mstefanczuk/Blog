(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('categoryController', function (allCategories) {
            var self = this;

            const POSTS_BY_CATEGORY_ULR_PREFIX = 'kategorie/';

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = POSTS_BY_CATEGORY_ULR_PREFIX;
        }
    );
})();