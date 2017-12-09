(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.directive('scrollTopOnClick', ['$document', function ($document) {
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