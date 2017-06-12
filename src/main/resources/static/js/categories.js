(function() {

    var app = angular.module('blog');

    app.controller('CategoriesController', ['$scope',
        function($scope) {

            $scope.things = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    ]);
})();