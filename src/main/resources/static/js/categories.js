(function () {

    var app = angular.module('blog');

    app.controller('CategoriesController',
        function ($scope) {

            $scope.things = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();