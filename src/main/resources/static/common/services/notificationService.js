(function () {
    'use strict';

    const NOTIFICATION_ELEMENT_ID = "notification";
    const NOTIFICATION_ELEMENT_VISIBLE_CLASS_NAME = "show";
    const NOTIFICATION_ELEMENT_VISIBLE_TIME = 3000;

    var appModule = angular.module('app');

    appModule.factory('notificationService', function () {
        return {
            showNotification: function (message, $event) {
                // Prevent default error notifications because we use our own
                $event.preventDefault();

                var notificationElement = document.getElementById(NOTIFICATION_ELEMENT_ID);
                angular.element(notificationElement).text(message);
                notificationElement.className = NOTIFICATION_ELEMENT_VISIBLE_CLASS_NAME;
                setTimeout(function () {
                    notificationElement.className =
                        notificationElement.className.replace(NOTIFICATION_ELEMENT_VISIBLE_CLASS_NAME, "");
                }, NOTIFICATION_ELEMENT_VISIBLE_TIME);
            }
        };
    })
})();