(function(){

    var myapp = angular.module('blog', ["ui.router"]);

    myapp.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/")

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "html/home.html"
            })

            .state('about', {
                url: "/about",
                templateUrl: "html/about.html"
            })
            .state('about.list', {
                url: "/list",
                templateUrl: "html/about.list.html",
                controller: "AboutController",
                controllerAs: "aboutCtrl"
            })

            .state('categories', {
                url: "/categories",
                templateUrl: "html/categories.html"
            })
            .state('categories.list', {
                url: "/list",
                templateUrl: "html/categories.list.html",
                controller: "CategoriesController",
                controllerAs: "categoriesCtrl"
            })
    });

    myapp.controller('NavbarController', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        }
    })
})();