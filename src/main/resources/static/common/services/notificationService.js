(function () {
    'use strict';

    var appModule = angular.module('app');

    appModule.factory('notificationService', function () {
        return {
            showNotification: function (message, $event) {
                // Prevent default error notifications because we use our own
                $event.preventDefault();

                var notificationElement = document.getElementById("notification");
                angular.element(notificationElement).text(message);
                notificationElement.className = "show";
                setTimeout(function () {
                    notificationElement.className = notificationElement.className.replace("show", "");
                }, 3000);
            }
        };
    })
})();