(function() {

    var app = angular.module('blog');

    app.controller('NavbarController', function ($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        }
    });
})();