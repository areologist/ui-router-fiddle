// modalConfig

(function () {
    "use strict";

    function modalConfig () {

        var config = {};

        config.person = {
            templateUrl: "partials/people.modal.html",
            controller: "PeopleFormController",
            controllerAs: "peopleForm",
            size: "lg"
        };

        config.awesome = {
            template: "<div class=\"modal-header\"><h3 class=\"modal-title\">Awesome</h3></div><div class=\"modal-body\"><div class=\"well\"><p>If this isn't awesome I don't know what is!</p></div></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"awesome.ok()\">OK</button></div>",
            controller: "AwesomeModalController",
            controllerAs: "awesome"
        };

        return config;
    }

    // angular inject

    angular.module("myApp").constant("modalConfig", modalConfig());
}());