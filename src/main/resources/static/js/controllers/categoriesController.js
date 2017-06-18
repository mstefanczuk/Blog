(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('categoriesController', function () {
            var self = this;

            self.things = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();