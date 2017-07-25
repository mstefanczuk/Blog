(function () {
    'use strict';

    var blogApp = angular.module('blog', ["ui.router", "duScroll", "ngAnimate"]);

    blogApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('blog', {
                abstract: true,
                views: {
                    masthead: {
                        templateUrl: "views/masthead.html"
                    },

                    header: {
                        templateUrl: "views/header.html"
                    },

                    '': {
                        templateUrl: "views/main.html"
                    },

                    sidebar: {
                        templateUrl: "views/sidebar.html",
                        controller: 'sidebarController as sidebarCtrl'
                    },

                    footer: {
                        templateUrl: "views/footer.html"
                    }
                },
                resolve: {
                    latest5Posts: ['postService', function (postService) {
                        return postService.getLatest5Posts();
                    }]
                }
            })

            .state('blog.home', {
                url: "/",
                templateUrl: "views/posts.html",
                controller: "postHeadingsController as postHeadingsCtrl",
                resolve: {
                    first6Posts: ['postService', function (postService) {
                        return postService.getLatest6FromPage(0);
                    }]
                }
            })

            .state('blog.about', {
                url: "/blog",
                templateUrl: "views/about.html"
            })

            .state('blog.author', {
                url: "/autor",
                templateUrl: "views/author.html"
            })

            .state('blog.categories', {
                url: "/kategorie",
                templateUrl: "views/categories.html"
            })
            .state('blog.categories.list', {
                url: "/list",
                templateUrl: "views/categories-list.html",
                controller: "categoryController as categoryCtrl"
            })

            .state('blog.archives', {
                url: "/archiwum",
                templateUrl: "views/archives.html"
            })

            .state('blog.post', {
                url: "/post/{postTitleUrl:.+}",
                templateUrl: "views/post.html",
                controller: "postDetailsController as postDetailsCtrl",
                resolve: {
                    postDetails: ['postService', '$stateParams', function (postService, $stateParams) {
                        return postService.getPostByTitleUrl($stateParams.postTitleUrl);
                    }]
                }
            })
    });
})();