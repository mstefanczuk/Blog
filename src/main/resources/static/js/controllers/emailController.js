(function () {
    'use strict';

    var blogApp = angular.module('blog');

    blogApp.controller('emailController', function (emailService) {
            var self = this;

            self.from = "";
            self.content = "";
            self.notificationMessage = "";
            self.submitButtonValue = "Wyślij";

            self.sendEmail = function () {
                self.submitButtonValue = "Czekaj...";

                emailService.send(self.from, JSON.stringify({from: self.from, content: self.content}))
                    .then(function (response) {
                        if (response.status === "SUCCESS") {
                            self.notificationMessage = "Wiadomość wysłana pomyślnie";
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
        }
    );
})();