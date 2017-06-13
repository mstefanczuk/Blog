(function () {

    var app = angular.module('blog');

    app.controller('AboutController',
        function ($scope) {

            $scope.items = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();