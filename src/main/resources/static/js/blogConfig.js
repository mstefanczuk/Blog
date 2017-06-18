(function () {
    'use strict';

    var blogApp = angular.module('blog', ["ui.router", "duScroll"]);

    blogApp.config(function ($stateProvider, $urlRouterProvider) {

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
                    latestPosts: ['postsService', function (PostsService) {
                        return PostsService.getLatest5Posts();
                    }]
                }
            })

            .state('blog.home', {
                url: "/",
                templateUrl: "views/home.html"
            })

            .state('blog.about', {
                url: "/about",
                templateUrl: "views/about.html"
            })

            .state('blog.author', {
                url: "/author",
                templateUrl: "views/author.html"
            })
            .state('blog.author.list', {
                url: "/list",
                templateUrl: "views/author-list.html",
                controller: "authorController as authorCtrl"
            })

            .state('blog.categories', {
                url: "/categories",
                templateUrl: "views/categories.html"
            })
            .state('blog.categories.list', {
                url: "/list",
                templateUrl: "views/categories-list.html",
                controller: "categoriesController"
            })

            .state('blog.archives', {
                url: "/archives",
                templateUrl: "views/archives.html"
            })

            .state('blog.post', {
                url: "/posts/{postId:[0-9]+}",
                templateUrl: "views/post.html",
                controller: "postsController as postsCtrl",
                resolve: {
                    postDetails: ['postsService', '$stateParams', function (PostsService, $stateParams) {
                        return PostsService.getPostById($stateParams.postId);
                    }]
                }
            })
    });
})();