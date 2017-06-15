(function () {

    var app = angular.module('blog');

    app.controller('authorController',
        function ($scope) {

            $scope.items = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();