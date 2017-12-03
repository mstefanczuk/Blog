(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.directive('scrollTopOnClick', ['$document', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                ele.on('click', function () {
                    $document.duScrollTopAnimated(0);
                });
            }
        }
    }])
})();