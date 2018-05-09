(function () {
    'use strict';

    const BUTTON_TEXT_VALUE_SUBMIT = "Zapisz";
    const BUTTON_TEXT_VALUE_WAIT = "Czekaj...";
    const BUTTON_TEXT_VALUE_DELETE = "Usuń";
    const NOTIFICATION_MESSAGE_ERROR = "Jeśli dokonałeś zmian, to coś poszło nie tak :(";
    const NOTIFICATION_MESSAGE_OK = "Zapisano";
    const NOTIFICATION_MESSAGE_DELETED = "Usunięto";
    const RIGHT_PANEL_LABEL_EDIT_MODE = "EDYCJA";
    const RIGHT_PANEL_LABEL_CREATE_MODE = "NOWY POST";

    const HTTP_OK = 200;

    let adminModule = angular.module('admin');

    adminModule.controller('adminPostController', function (first6Posts, postService, categoryService, $scope,
                                                            notificationService, $state, $stateParams) {
        let self = this;

        self.postPagesCounter = 1;
        self.postsList = first6Posts;
        self.postObject = {
            id: null, title: "", body: "", author: null,
            date: null, titleUrl: "", category: null, image: ""
        };
        self.imageFile = null;
        $scope.editFormVisible = false;
        self.rightPanelLabel = "";
        self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
        self.deleteButtonValue = BUTTON_TEXT_VALUE_DELETE;
        self.isCreateModeOn = false;
        self.event = null;
        self.notificationMessage = "";
        self.categories = null;

        loadNextPostsOnScrollReachedBottom();
        loadCategories();

        self.changeImage = function () {
            self.postObject.image = self.imageFile.base64;
        };

        self.setCurrentPost = function (post) {
            self.postObject = angular.copy(post);
            $scope.editFormVisible = true;
            self.rightPanelLabel = RIGHT_PANEL_LABEL_EDIT_MODE;
            self.isCreateModeOn = false;
        };

        self.setCreateModeOn = function () {
            clearPostObject();
            $scope.editFormVisible = true;
            self.rightPanelLabel = RIGHT_PANEL_LABEL_CREATE_MODE;
            self.isCreateModeOn = true;
        };

        self.submitChanges = function ($event) {
            self.event = $event;
            self.isCreateModeOn ? createPost() : updatePost();
        };

        self.deletePost = function ($event) {
            self.event = $event;

            self.deleteButtonValue = BUTTON_TEXT_VALUE_WAIT;

            postService.delete($stateParams.id)
                .then(
                    function (response) {
                        if (response.status === HTTP_OK) {
                            self.notificationMessage = NOTIFICATION_MESSAGE_DELETED;
                            $scope.closeThisDialog();
                        } else {
                            self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                        }

                        showNotification();
                        self.deleteButtonValue = BUTTON_TEXT_VALUE_DELETE;
                    }
                )
        };

        function createPost() {
            self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

            postService.create(self.postObject)
                .then(
                    function (response) {
                        if (response && response.title === self.postObject.title &&
                            response.image === self.postObject.image) {
                            self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            $state.reload();
                        } else {
                            self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                        }

                        showNotification();
                        self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                    }
                )
        }

        function updatePost() {
            self.submitButtonValue = BUTTON_TEXT_VALUE_WAIT;

            postService.update(self.postObject.id, self.postObject)
                .then(
                    function (response) {
                        if (response && response.title === self.postObject.title
                            && response.image === self.postObject.image) {
                            self.notificationMessage = NOTIFICATION_MESSAGE_OK;
                            $state.reload();
                        } else {
                            self.notificationMessage = NOTIFICATION_MESSAGE_ERROR;
                        }

                        showNotification();
                        self.submitButtonValue = BUTTON_TEXT_VALUE_SUBMIT;
                    }
                );
        }

        function loadNextPosts() {
            postService.getNext6FromPage(self.postPagesCounter).then(
                function (response) {
                    self.postsList = self.postsList.concat(response);
                    self.postPagesCounter++;
                }
            );
        }

        function loadNextPostsOnScrollReachedBottom() {
            $(window).scroll(function () {
                if (($(window).scrollTop() + 20) >= ($(document).height() - $(window).height())) {
                    loadNextPosts();
                }
            })
        }

        function loadCategories() {
            categoryService.getAllCategories().then(
                function (response) {
                    self.categories = response;
                }
            )
        }

        function clearPostObject() {
            self.postObject = {
                id: null, title: "", body: "", author: null,
                date: null, titleUrl: "", category: null, image: ""
            }
        }

        function showNotification() {
            notificationService.showNotification(self.notificationMessage, self.event);
        }
    });
})();