(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('categoryController', function () {
            var self = this;

            self.things = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();