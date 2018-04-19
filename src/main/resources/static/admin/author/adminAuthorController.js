(function () {
    'use strict';

    const BUTTON_TEXT_VALUE_SUBMIT = "Zapisz";
    const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
    const BUTTON_TEXT_VALUE_DATA_LOADING = "Ładowanie danych...";
    const NOTIFICATION_MESSAGE_ERROR = "Jeśli dokonałeś zmian, to coś poszło nie tak :(";
    const NOTIFICATION_MESSAGE_OK = "Zapisano";
    const AUTHOR_FULL_DESCRIPTION_STATIC_CONTENT_NAME = 'author';
    const AUTHOR_SIDEBAR_DESCRIPTION_STATIC_CONTENT_NAME = 'authorSidebar';
    const AUTHOR_SIDEBAR_IMAGE_STATIC_CONTENT_NAME = 'authorSidebarImage';

    let adminModule = angular.module('admin');

    adminModule.controller('adminAuthorController', function (staticContentService, notificationService, $q) {
            let self = this;

            self.fullDescriptionObject = null;

            self.sidebarDescriptionObject = null;
            self.sidebarImageObject = null;
            self.sidebarImageFile = null;

            self.submitImageButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
            self.submitShortDescButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
            self.submitFullDescButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
            self.notificationMessage = "";
            self.event = null;

            loadContent();

            self.changeImage = function () {
                self.sidebarImageObject.body = self.sidebarImageFile.base64;
            };

            self.updateSidebarImage = function ($event) {
                self.event = $event;
                self.submitImageButtonValue = BUTTON_TEXT_VALUE_WAIT;

                return staticContentService.updateStaticContent(self.sidebarImageObject.id, self.sidebarImageObject)
                    .then(
                        function (response) {
                            if (response.body === self.sidebarImageObject.body) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitImageButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                        }
                    );
            };

            self.updateSidebarDescription = function ($event) {
                self.event = $event;

                self.submitShortDescButtonValue = BUTTON_TEXT_VALUE_WAIT;

                return staticContentService.updateStaticContent(self.sidebarDescriptionObject.id, self.sidebarDescriptionObject)
                    .then(
                        function (response) {
                            if (response.body === self.sidebarDescriptionObject.body) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitShortDescButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                        }
                    );
            };

            self.updateFullDescription = function ($event) {
                self.event = $event;

                return staticContentService.updateStaticContent(self.fullDescriptionObject.id, self.fullDescriptionObject)
                    .then(
                        function (response) {
                            if (response.body === self.fullDescriptionObject.body) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitFullDescButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                        }
                    );
            };

            function loadContent() {
                setAllButtonsValues(BUTTON_TEXT_VALUE_DATA_LOADING);

                $q.all([loadFullDescription(), loadSidebarDescription(), loadSidebarImage()]).then(
                    function () {
                        setAllButtonsValues(BUTTON_TEXT_VALUE_SUBMIT);
                    }
                );
            }

            function loadFullDescription() {
                return staticContentService.getStaticContentByName(AUTHOR_FULL_DESCRIPTION_STATIC_CONTENT_NAME).then(
                    function (response) {
                        self.fullDescriptionObject = response;
                    }
                )
            }

            function loadSidebarDescription() {
                return staticContentService.getStaticContentByName(AUTHOR_SIDEBAR_DESCRIPTION_STATIC_CONTENT_NAME).then(
                    function (response) {
                        self.sidebarDescriptionObject = response;
                    }
                )
            }

            function loadSidebarImage() {
                return staticContentService.getStaticContentByName(AUTHOR_SIDEBAR_IMAGE_STATIC_CONTENT_NAME).then(
                    function (response) {
                        self.sidebarImageObject = response;
                    }
                )
            }

            function showNotification() {
                notificationService.showNotification(self.notificationMessage, self.event);
            }

            function setAllButtonsValues(value) {
                self.submitImageButtonValue = value;
                self.submitShortDescButtonValue = value;
                self.submitFullDescButtonValue = value;
            }
        }
    );
})();