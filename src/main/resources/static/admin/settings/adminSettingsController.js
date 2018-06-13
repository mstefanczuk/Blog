(function () {
    'use strict';

    const BUTTON_TEXT_VALUE_SUBMIT = "Zapisz";
    const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
    const NOTIFICATION_MESSAGE_ERROR = "Błąd, hasło nie zostało zmienione";
    const NOTIFICATION_MESSAGE_OLD_PASSWORDS_NOTE_EQUAL = "Nieprawidłowe obecne hasło";
    const NOTIFICATION_MESSAGE_NEW_PASSWORDS_NOT_EQUAL = "Wartości pól nowego hasła muszą być równe";
    const NOTIFICATION_MESSAGE_OK = "Hasło zmienione";
    const ADMIN_USERNAME = "stefan";

    let adminModule = angular.module('admin');

    adminModule.controller('adminSettingsController', function ($scope, userService, notificationService) {
            let self = this;

            self.passwordData = {
                currentPassword: "",
                newPassword: ""
            };
            self.newPassword2 = "";
            self.notificationMessage = "";
            self.event = null;
            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;

            self.changePassword = function ($event) {
                self.event = $event;

                if (self.passwordData.newPassword !== self.newPassword2) {
                    self.notificationMessage = NOTIFICATION_MESSAGE_NEW_PASSWORDS_NOT_EQUAL;
                    showNotification();
                    return;
                }

                self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

                userService.changeAdminPassword(self.passwordData)
                    .then(
                        function (response) {
                            console.log(response);
                            if (response && response.data.username === ADMIN_USERNAME) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else if (response && response.status === 409) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OLD_PASSWORDS_NOTE_EQUAL;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                        }
                    )
            };

            function showNotification() {
                notificationService.showNotification(self.notificationMessage, self.event);
            }
        }
    );
})();