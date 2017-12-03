(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('aboutController', function (staticContentService, $sce) {
            var self = this;
            self.authorDescriptionStaticContentName = 'blog';

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