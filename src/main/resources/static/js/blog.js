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
                        templateUrl: "html/masthead.html"
                    },

                    header: {
                        templateUrl: "html/header.html"
                    },

                    '': {
                        templateUrl: "html/main.html"
                    },

                    sidebar: {
                        templateUrl: "html/sidebar.html",
                        controller: 'SidebarController as sidebarCtrl'
                    },

                    footer: {
                        templateUrl: "html/footer.html"
                    }
                },
                resolve: {
                    latestPosts: ['PostsService', function (PostsService) {
                        return PostsService.getLatest5Posts();
                    }]
                }
            })

            .state('blog.home', {
                url: "/",
                templateUrl: "html/home.html",
                onEnter: scrollTop
            })

            .state('blog.about', {
                url: "/about",
                templateUrl: "html/about.html",
                onEnter: scrollTop
            })

            .state('blog.author', {
                url: "/author",
                templateUrl: "html/author.html",
                onEnter: scrollTop
            })
            .state('blog.author.list', {
                url: "/list",
                templateUrl: "html/author-list.html",
                controller: "authorController as authorCtrl"
            })

            .state('blog.categories', {
                url: "/categories",
                templateUrl: "html/categories.html",
                onEnter: scrollTop
            })
            .state('blog.categories.list', {
                url: "/list",
                templateUrl: "html/categories-list.html",
                controller: "CategoriesController as categoriesCtrl"
            })

            .state('blog.archives', {
                url: "/archives",
                templateUrl: "html/archives.html",
                onEnter: scrollTop
            })
    });

    function scrollTop($document) {
        $document.scrollTopAnimated(0);
    }
})();