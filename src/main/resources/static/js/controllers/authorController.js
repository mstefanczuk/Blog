(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('authorController', function () {
            var self = this;

            self.items = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();