// serviceConfig

(function () {
    "use strict";

    function serviceConfig () {

        var config = {};

        config.endpoints = {
        	people: "data/people.json"
        };

        config.useLocalForage = false;


        return config;
    }

    // angular inject

    angular.module("myApp").constant("serviceConfig", serviceConfig());
}());