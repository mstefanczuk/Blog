(function () {
    'use strict';

    const AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME = 'author';

    let blogModule = angular.module('blog');

    blogModule.controller('authorController', function (staticContentService) {
            let self = this;

            self.content = "";

            loadContent();

            function loadContent() {
                staticContentService.getStaticContentByName(AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME).then(
                    function (response) {
                        self.content = response.body;
                    }
                )
            }
        }
    );
})();