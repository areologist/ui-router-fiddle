
(function () {
    "use strict";

    angular.module("myApp")
        .controller("NavbarController", function (ngDialog) {

            this.openModal = function () {

                ngDialog.open({
                    template: "<h1>Awesome</h1><p>This is a modal dialog of some sort.</p>",
                    className: "ngdialog-theme-default",
                    plain: true
                });
            };
        });
}());
