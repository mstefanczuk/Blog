(function () {
    'use strict';

    let  appModule = angular.module('app');

    appModule.directive('scrollTopOnClick', ['$document', function ($document) {
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