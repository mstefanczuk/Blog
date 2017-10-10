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
                        return postService.getNext6FromPage(0);
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
                templateUrl: "views/categories.html",
                controller: "categoryController as categoryCtrl",
                resolve: {
                    allCategories: ['categoryService', function (categoryService) {
                        return categoryService.getAllCategories();
                    }]
                }
            })

            .state('blog.contact', {
                url: "/kontakt",
                templateUrl: "views/contact.html",
                controller: "emailController as emailCtrl"
            })

            .state('blog.postsByCategory', {
                url: "/kategorie/{categoryNameUrl:.+}",
                templateUrl: "views/posts-by-category.html",
                controller: "postHeadingsByCategoryController as postHeadingsByCategoryCtrl",
                resolve: {
                    first6PostsByCategory: ['postService', '$stateParams', function (postService, $stateParams) {
                        return postService.getNext6ByCategoryNameUrlFromPage($stateParams.categoryNameUrl, 0);
                    }]
                }
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