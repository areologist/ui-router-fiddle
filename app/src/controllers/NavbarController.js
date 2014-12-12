
(function () {
    "use strict";

    angular.module("myApp")
        .controller("NavbarController", function (modalService, serviceConfig) {

            // former home of redacted ngDialog experiment

            var that = this;

            this.storage = false;

            this.updateStorage = function () {

                serviceConfig.useLocalForage = that.storage;
            };

            this.storageButtonClass = function () {
                return that.storage ? "btn-success" : "btn-default";
            };

            this.openAwesome = function () {

            	modalService.openAwesome("md")
            		.then(function (result) {

                        console.log("We're done; clicked okay. ");
                    }, function () {

                        console.log("Welp, dialog was dismissed.");
                    });
            };
        });
}());
