(function () {
    'use strict';

    const AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME = 'author';

    let blogModule = angular.module('blog');

    blogModule.controller('authorController', function (staticContentService, $sce) {
            let self = this;

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