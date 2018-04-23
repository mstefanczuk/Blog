(function () {
    'use strict';

    const POSTS_BY_CATEGORY_ULR_PREFIX = 'kategorie/';

    const BUTTON_TEXT_VALUE_SUBMIT = "Zapisz";
    const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
    const NOTIFICATION_MESSAGE_ERROR = "Jeśli dokonałeś zmian, to coś poszło nie tak :(";
    const NOTIFICATION_MESSAGE_OK = "Zapisano";
    const RIGHT_PANEL_LABEL_EDIT_MODE = "EDYCJA";
    const RIGHT_PANEL_LABEL_CREATE_MODE = "NOWA KATEGORIA";

    let adminModule = angular.module('admin');

    adminModule.controller('adminCategoryController', function (allCategories, $scope, categoryService,
                                                                notificationService, $state) {
            let self = this;

            self.categories = allCategories;
            self.postsByCategoryUrlPrefix = POSTS_BY_CATEGORY_ULR_PREFIX;
            self.imageFile = null;
            self.categoryObject = {id: null, name: "", nameUrl: "", image: ""};
            self.rightPanelLabel = "";
            self.isCreateModeOn = false;
            self.notificationMessage = "";
            self.event = null;
            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
            $scope.editFormVisible = false;

            self.changeImage = function () {
                self.categoryObject.image = self.imageFile.base64;
            };

            self.setCurrentCategory = function (category) {
                self.categoryObject = category;
                $scope.editFormVisible = true;
                self.rightPanelLabel = RIGHT_PANEL_LABEL_EDIT_MODE;
                self.isCreateModeOn = false;
            };

            self.setCreateModeOn = function () {
                clearCategoryObject();
                $scope.editFormVisible = true;
                self.rightPanelLabel = RIGHT_PANEL_LABEL_CREATE_MODE;
                self.isCreateModeOn = true;
            };

            self.submitChanges = function ($event) {
                self.event = $event;
                self.isCreateModeOn ? createCategory() : updateCategory();
            };

            function createCategory() {
                self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

                categoryService.create(self.categoryObject)
                    .then(
                        function (response) {
                            if (response && response.name === self.categoryObject.name &&
                                response.image === self.categoryObject.image) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                            $state.reload();
                        }
                    )
            }

            function updateCategory() {
                self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

                categoryService.update(self.categoryObject.id, self.categoryObject)
                    .then(
                        function (response) {
                            if (response && response.name === self.categoryObject.name
                                && response.image === self.categoryObject.image) {
                                self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            } else {
                                self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                            }

                            showNotification();
                            self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                        }
                    );
            }

            function clearCategoryObject() {
                self.categoryObject = {id: null, name: "", nameUrl: "", image: ""};
            }

            function showNotification() {
                notificationService.showNotification(self.notificationMessage, self.event);
            }
        }
    );
})();