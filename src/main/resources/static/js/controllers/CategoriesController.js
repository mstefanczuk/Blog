(function () {
    'use strict';

    var app = angular.module('blog');

    app.controller('CategoriesController', function () {
            var self = this;

            self.things = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();