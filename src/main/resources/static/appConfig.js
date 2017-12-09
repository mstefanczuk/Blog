(function () {
    'use strict';

    var appModule = angular.module('app', ["ui.router", "duScroll", "ngAnimate"]);

    appModule.config(function ($stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('blog', {
                abstract: true,
                templateUrl: "blog/layout/main.html"
            })
    });
})();