(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.animation('.fadein', function () {
        return {
            enter: function (element, done) {
                $(element).hide().fadeIn(800, done);
            },
            leave: function (element, done) {
                $(element).fadeOut(800, done);
            }
        };
    });
})();


