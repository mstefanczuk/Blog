(function () {
    'use strict';

    var adminModule = angular.module('admin', ["ui.router", "duScroll", "ngAnimate"]);

    adminModule.config(function ($stateProvider) {

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
    });
})();