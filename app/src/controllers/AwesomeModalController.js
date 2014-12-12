// AwesomeModalController

(function () {
    "use strict";

    function AwesomeModalController ($modalInstance) {

        this.ok = function () {

            $modalInstance.close();
        };

        this.cancel = function () {

            $modalInstance.dismiss("cancel");
        };
    }

    // register with angular
    
    angular.module("myApp").controller("AwesomeModalController", AwesomeModalController);

}());
