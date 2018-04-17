(function () {
    'use strict';

    const POSTS_BY_CATEGORY_ULR_PREFIX = 'kategorie/';

    let blogModule = angular.module('app');

    blogModule.controller('categoryController', function (allCategories) {

            let self = this;

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = POSTS_BY_CATEGORY_ULR_PREFIX;
        }
    );
})();