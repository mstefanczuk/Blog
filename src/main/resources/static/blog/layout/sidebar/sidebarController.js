(function () {
    'use strict';

    const POST_ULR_PREFIX = "post/";
    const AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME = 'authorSidebar';
    const AUTHOR_IMAGE_STATIC_CONTENT_NAME = 'authorSidebarImage';

    let blogModule = angular.module('blog');

    blogModule.controller('sidebarController', function (latest5Posts, first5TopPosts, staticContentService) {
        let self = this;

        self.latest5Posts = latest5Posts;
        self.first5TopPosts = first5TopPosts;
        self.postUrlPrefix = POST_ULR_PREFIX;

        self.authorDescription = "";
        self.authorImageAsBase64 = "";

        loadContent();

        function loadContent() {
            loadDescription();
            loadImage();
        }

        function loadDescription() {
            staticContentService.getStaticContentByName(AUTHOR_DESCRIPTION_STATIC_CONTENT_NAME).then(
                function (response) {
                    self.authorDescription = response.body;
                }
            )
        }

        function loadImage() {
            staticContentService.getStaticContentByName(AUTHOR_IMAGE_STATIC_CONTENT_NAME).then(
                function (response) {
                    self.authorImageAsBase64 = response.body;
                }
            )
        }
    });
})();