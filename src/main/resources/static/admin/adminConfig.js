(function () {
    'use strict';

    let adminModule = angular.module('admin', ["ui.router", "duScroll", "ngAnimate", "textAngular", "naif.base64",
                                                "ngDialog"]);

    adminModule.config(function ($stateProvider, $provide) {

        $stateProvider
            .state('admin.main', {
                abstract: true,
                views: {
                    masthead: {
                        templateUrl: "admin/layout/masthead.html"
                    },

                    header: {
                        templateUrl: "admin/layout/header.html"
                    },

                    '': {
                        templateUrl: "admin/layout/content.html"
                    }
                }
            })

            .state('admin.main.home', {
                url: "/admin",
                templateUrl: "admin/home/home.html"
            })

            .state('admin.main.about', {
                url: "/admin/blog",
                templateUrl: "admin/about/about.html",
                controller: 'aboutController as aboutCtrl'
            })

            .state('admin.main.author', {
                url: "/admin/autor",
                templateUrl: "admin/author/author.html",
                controller: 'adminAuthorController as adminAuthorCtrl'
            })

            .state('admin.main.author.short', {
                url: "/skrocony-opis",
                templateUrl: "admin/author/sidebar-description.html",
                controller: 'adminAuthorController as adminAuthorCtrl'
            })

            .state('admin.main.author.full', {
                url: "/pelny-opis",
                templateUrl: "admin/author/full-description.html",
                controller: 'adminAuthorController as adminAuthorCtrl'
            })

            .state('admin.main.categories', {
                url: "/admin/kategorie",
                templateUrl: "admin/categories/categories.html",
                controller: "adminCategoryController as adminCategoryCtrl",
                resolve: {
                    allCategories: ['categoryService', function (categoryService) {
                        return categoryService.getAllCategories();
                    }]
                }
            })

            .state('admin.main.posts', {
                url: "/admin/posty",
                templateUrl: "admin/posts/posts.html",
                controller: "adminPostController as adminPostCtrl",
                resolve: {
                    first6Posts: ['postService', function (postService) {
                        return postService.getNext6FromPage(0);
                    }]
                }
            })

            .state("admin.main.posts.confirm", {
                url: "/potwierdz",
                params: {id: null},
                onEnter: ['ngDialog', '$state', function(ngDialog, $state) {
                    ngDialog.open({
                        template: 'admin/posts/confirm.html',
                        controller: 'adminPostController as adminPostCtrl',
                        resolve: {
                            first6Posts: ['postService', function (postService) {
                                return postService.getNext6FromPage(0);
                            }]
                        }
                    }).closePromise.finally(function() {
                        $state.go('^', {}, {reload: true});
                    });
                }]
            });

        $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate',
            function (taRegisterTool, taToolFunctions, taOptions) {
                taRegisterTool('uploadImage', {
                    iconclass: "fa fa-picture-o",
                    tooltiptext: 'Upload an image',
                    onElementSelect: {
                        element: 'img',
                        action: taToolFunctions.imgOnSelectAction
                    },
                    action: function () {
                        let $editor = this.$editor;
                        let input = document.createElement('input');
                        input.type = 'file';
                        input.accept = "image/*";

                        input.onchange = function () {
                            let reader = new FileReader();

                            if (this.files && this.files[0]) {
                                reader.onload = function (e) {
                                    $editor().wrapSelection('insertHtml', '<img src=' + e.target.result + '>', true);
                                };

                                reader.readAsDataURL(this.files[0]);
                            }
                        };

                        input.click();
                    }
                });
                taOptions.toolbar[1].push('uploadImage');
                return taOptions;
            }]);
    });
})();