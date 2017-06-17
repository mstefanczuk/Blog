(function () {
    'use strict';

    var app = angular.module('blog');

    app.controller('authorController', function () {
            var self = this;

            self.items = ["Coś", "Z", "Jakiejś", "Listy"];
        }
    );
})();