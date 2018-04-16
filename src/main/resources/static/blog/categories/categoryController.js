(function () {
    'use strict';

    const POSTS_BY_CATEGORY_ULR_PREFIX = 'kategorie/';

    var blogModule = angular.module('blog');
    blogModule.controller('categoryController', function (allCategories) {

            var self = this;

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = POSTS_BY_CATEGORY_ULR_PREFIX;
        }
    );
})();