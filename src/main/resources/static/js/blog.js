(function () {

    var app = angular.module('blog', ["ui.router", "duScroll"]);

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "html/home.html",
                onEnter: scrollTop
            })

            .state('about', {
                url: "/about",
                templateUrl: "html/about.html",
                onEnter: scrollTop
            })
            .state('about.list', {
                url: "/list",
                templateUrl: "html/about-list.html",
                controller: "AboutController",
                controllerAs: "aboutCtrl"
            })

            .state('categories', {
                url: "/categories",
                templateUrl: "html/categories.html",
                onEnter: scrollTop
            })
            .state('categories.list', {
                url: "/list",
                templateUrl: "html/categories-list.html",
                controller: "CategoriesController",
                controllerAs: "categoriesCtrl"
            })

            .state('archives', {
                url: "/archives",
                templateUrl: "html/archives.html",
                onEnter: scrollTop
            })
    });

    function scrollTop($document) {
        $document.scrollTopAnimated(0);
    }
})();