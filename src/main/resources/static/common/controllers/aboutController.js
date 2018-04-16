(function () {
    'use strict';

    const BUTTON_TEXT_VALUE_SUBMIT = "Zapisz";
    const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
    const BUTTON_TEXT_VALUE_DATA_LOADING = "Ładowanie danych...";
    const NOTIFICATION_MESSAGE_ERROR = "Jeśli dokonałeś zmian, to coś poszło nie tak :(";
    const NOTIFICATION_MESSAGE_OK = "Zapisano";
    const BLOG_DESCRIPTION_STATIC_CONTENT_NAME = "blog";

    var appModule = angular.module('app');

    appModule.controller('aboutController', function (staticContentService, notificationService) {

            var self = this;

            self.blogDescriptionStaticContentName = BLOG_DESCRIPTION_STATIC_CONTENT_NAME;
            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
            self.contentObject = null;
            self.notificationMessage = "";
            self.event = null;

            loadContent();

            self.updateContent = function ($event) {
                self.event = $event;

                self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

                staticContentService.updateStaticContent(self.contentObject.id, self.contentObject).then(
                    function (response) {
                        if (response.body === self.contentObject.body) {
                            self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                        } else {
                            self.notificationMessage = NOTIFICATION_MESSAGE_ERROR
                        }

                        showNotification();
                        self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                    });
            };

            function loadContent() {
                self.submitButtonValue = BUTTON_TEXT_VALUE_DATA_LOADING;

                staticContentService.getStaticContentByName(self.blogDescriptionStaticContentName).then(
                    function (response) {
                        self.contentObject = response;

                        self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                    });
            }

            function showNotification() {
                notificationService.showNotification(self.notificationMessage, self.event);
            }
        }
    );
})();