(function () {
    'use strict';
    
    const POST_ULR_PREFIX = "post/";
    const AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME = 'authorSidebar';

    var blogModule = angular.module('blog');

    blogModule.controller('sidebarController', function (latest5Posts, $sce, staticContentService) {
        var self = this;

        self.latest5Posts = latest5Posts;
        self.postUrlPrefix = POST_ULR_PREFIX;

        loadContent();

        function loadContent() {
            staticContentService.getStaticContentByName(AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME).then(
                function (response) {
                    self.authorDescription = $sce.trustAsHtml(response.body);
                }
            )
        }
    });
})();