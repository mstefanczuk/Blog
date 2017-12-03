(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('authorController', function (staticContentService, $sce) {
            var self = this;
            self.authorDescriptionStaticContentName = 'author';

            loadContent();

            function loadContent() {
                staticContentService.getStaticContentByName(self.authorDescriptionStaticContentName).then(
                    function (response) {
                        self.content = $sce.trustAsHtml(response.body);
                    }
                )
            }
        }
    );
})();