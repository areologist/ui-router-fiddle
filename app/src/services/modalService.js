/* modal dialog service */

(function () {
    "use strict";

    function modalService ($modal, $log, modalConfig) {

        // declarations
        var service;

        // implementations

        function open (config) {

            return $modal.open(config).result;
        }

        /**
         * Instantiate and display a Person modal form
         */
        function openPerson (id) {

            var config = modalConfig.person;
            config.resolve = {
                items: function () {
                    return ["An item of some kind", "Another random item", "A third filler item"];
                },
                id: function () {
                    return id;
                }
            };

            return open(config);
        }

        /**
         * Instantiate and display an Awesome modal
         */
        function openAwesome (size) {

            var config = modalConfig.awesome;
            config.size = size || "md";
            return open(config);
        }

        // return object

        service = {
            openPerson: openPerson,
            openAwesome: openAwesome
        };

        return service;
    }


    // angular registration
    
    angular.module("myApp")
        .factory("modalService", modalService);

}());