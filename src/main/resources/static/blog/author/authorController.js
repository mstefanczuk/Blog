(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('authorController', function (staticContentService, $sce) {
            var self = this;

            const AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME = 'author';

            loadContent();

            function loadContent() {
                staticContentService.getStaticContentByName(AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME).then(
                    function (response) {
                        self.content = $sce.trustAsHtml(response.body);
                    }
                )
            }
        }
    );
})();