(function () {
    'use strict';

    var blogModule = angular.module('blog');

    blogModule.controller('emailController', function (emailService, $scope) {
            var self = this;

            self.from = "";
            self.content = "";
            self.notificationMessage = "";
            self.submitButtonValue = "Wyślij";

            self.sendEmail = function ($event) {
                // Prevent default error notifications because we use our own
                $event.preventDefault();

                if (!fieldsAreOk()) {
                    showSnackBar();
                    return;
                }

                self.submitButtonValue = "Czekaj...";

                emailService.send(self.from, JSON.stringify({from: self.from, content: self.content}))
                    .then(function (response) {
                        if (response.status === "SUCCESS") {
                            self.notificationMessage = "Wiadomość została wysłana";
                        } else {
                            self.notificationMessage = "Wysyłanie nie powiodło się";
                        }

                        showSnackBar();
                        self.submitButtonValue = "Wyślij";
                    });
            };

            function showSnackBar() {
                var notificationElement = document.getElementById("notification")
                notificationElement.className = "show";
                setTimeout(function () {
                    notificationElement.className = notificationElement.className.replace("show", "");
                }, 3000);
            }

            function fieldsAreOk() {
                if ($scope.contactForm.emailField.$error.required) {
                    self.notificationMessage = "Adres email jest wymagany";
                    return false;
                }

                if ($scope.contactForm.emailField.$error.email) {
                    self.notificationMessage = "Niepoprawna forma adresu email";
                    return false;
                }

                return true;
            }
        }
    );
})();