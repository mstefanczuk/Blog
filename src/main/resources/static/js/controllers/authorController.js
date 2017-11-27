(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('authorController', function (staticContentService, $sce) {
            var self = this;
            self.staticContentName = 'author';

            loadContent();

            function loadContent() {
                staticContentService.getStaticContentByName(self.staticContentName).then(
                    function (response) {
                        self.content = $sce.trustAsHtml(response.body);
                    }
                )
            }
        }
    );
})();