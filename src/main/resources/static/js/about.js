(function() {

    var app = angular.module('blog');

    app.controller('AboutController', ['$scope',
        function($scope) {

            $scope.items = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    ]);
})();