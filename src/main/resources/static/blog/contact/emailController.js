(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('emailController', function (emailService, notificationService, $scope) {
            var self = this;

            const BUTTON_TEXT_VALUE_SEND = "Wyślij";
            const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
            const NOTIFICATION_MESSAGE_SENT = "Wiadomość została wysłana";
            const NOTIFICATION_MESSAGE_ERROR = "Wysyłanie nie powiodło się";
            const NOTIFICATION_MESSAGE_EMAIL_REQUIRED = "Adres email jest wymagany";
            const NOTIFICATION_MESSAGE_INVALID_EMAIL = "Niepoprawna forma adresu email";

            self.from = "";
            self.content = "";
            self.notificationMessage = "";
            self.submitButtonValue = BUTTON_TEXT_VALUE_SEND;
            self.event = null;

            self.sendEmail = function ($event) {
                self.event = $event;

                if (!areFieldsValid()) {
                    showNotification();
                    return;
                }

                self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

                emailService.send(self.from, JSON.stringify({from: self.from, content: self.content}))
                    .then(function (response) {
                        if (response.status === "SUCCESS") {
                            self.notificationMessage = NOTIFICATION_MESSAGE_SENT;
                        } else {
                            self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                        }

                        showNotification();
                        self.submitButtonValue = BUTTON_TEXT_VALUE_SEND;
                    });
            };

            function showNotification() {
                notificationService.showNotification(self.notificationMessage, self.event);
            }

            function areFieldsValid() {
                if ($scope.contactForm.emailField.$error.required) {
                    self.notificationMessage = NOTIFICATION_MESSAGE_EMAIL_REQUIRED;
                    return false;
                }

                if ($scope.contactForm.emailField.$error.email) {
                    self.notificationMessage = NOTIFICATION_MESSAGE_INVALID_EMAIL;
                    return false;
                }

                return true;
            }
        }
    );
})();