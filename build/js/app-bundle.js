
(function () {
    "use strict";

    var app = angular.module("myApp", [
        "ngAnimate",
        "ui.router",
        "LocalForageModule",
        "ui.bootstrap"
    ]);

    app.value("useLocalForage", false);

    app.config( ["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider.otherwise("/dashboard");
      
      $stateProvider

        /**
         * Dashboard router states
         */
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "partials/dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboard"
        })
        .state("dashboard.people", {
            url: "/people",
            templateUrl: "partials/dashboard.people.html",
            controller: "PeopleController",
            controllerAs: "people"
        })
        .state("dashboard.reports", {
            url: "/reports",
            templateUrl: "partials/dashboard.reports.html"
        })
        .state("dashboard.analytics", {
            url: "/analytics",
            templateUrl: "partials/dashboard.analytics.html"
        })
        .state("dashboard.export", {
            url: "/export",
            templateUrl: "partials/dashboard.export.html"
        })

        /**
         * To-Do List router states
         */
        .state("todo", {
            url: "/todo",
            templateUrl: "partials/todo.html"
        })
        .state("todo.list", {
            url: "/list",
            templateUrl: "partials/todo.list.html",
            controller: function () {

                this.things = [
                    "A Thing",
                    "Another Thing",
                    "Yet Another Thing",
                    "One Last Thing"
                ];
            },
            controllerAs: "todo"
        })

        /**
         * Profile router states
         */
        .state("profile", {
            url: "/profile",
            templateUrl: "partials/profile.html"
        });
    }])

    //
    // localForage config
    //
    .config(["$localForageProvider", function ($localForageProvider) {

        $localForageProvider.setNotify(true, true); // itemSet, itemRemove
    }]);
}());

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
    AwesomeModalController.$inject = ["$modalInstance"];

    // register with angular
    
    angular.module("myApp").controller("AwesomeModalController", AwesomeModalController);

}());

// dashboard

(function () {
    "use strict";

    angular.module("myApp")
        .controller("DashboardController", ["$state", "peopleService", function ($state, peopleService) {

            var that = this;

            this.alert = null;

            function setAlert(message, type) {

                that.alert = {
                    message: message || "",
                    type: type || "info"
                };
            }

            this.activeClass = function (name) {

                return (name === $state.current.name) ? "active" : "";
            };

            this.isPeopleView = function () {

                return $state.current.name === "dashboard.people";
            };

            this.closeAlert = function () {

                this.alert = null;
            };

            this.savePeople = function () {

                console.log("Saving people!");
                peopleService.cachePeople()
                    .then(function (data) {

                        setAlert("People data saved to local storage.", "success");
                    }, function (data) {

                        setAlert("Failed to save people data.", "danger");
                    });
            };
        }]);
}());

(function () {
    "use strict";

    angular.module("myApp")
        .controller("NavbarController", ["modalService", "serviceConfig", function (modalService, serviceConfig) {

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
        }]);
}());

//

(function () {
    "use strict";

    angular.module("myApp")
        .controller("PeopleController", ["peopleService", "modalService", function (peopleService, modalService) {

            var that = this;

            this.openPersonModal = function (id) {

                modalService.openPerson(id)
                    .then(function (selectedItem) {

                        that.selected = {
                            value: selectedItem,
                            guid: id
                        };
                    }, function () {

                        console.log("Modal dismissed");
                    });
            };

            this.people = [];

            peopleService.getPeople().then(function (data) {

                that.people = data;
            });

        }]);
}());
// PeopleFormController

(function () {
    "use strict";

    function PeopleFormController ($modalInstance, items, id) {

        var that = this;

        this.items = items;
        this.id = id;

        this.selected = {
            item: this.items[0]
        };

        this.ok = function () {

            $modalInstance.close(that.selected.item);
        };

        this.cancel = function () {

            $modalInstance.dismiss("cancel");
        };
    }
    PeopleFormController.$inject = ["$modalInstance", "items", "id"];

    // register with angular
    
    angular.module("myApp").controller("PeopleFormController", PeopleFormController);

}());

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
    modalService.$inject = ["$modal", "$log", "modalConfig"];


    // angular registration
    
    angular.module("myApp")
        .factory("modalService", modalService);

}());
/* people data service */

(function () {
    "use strict";

    function peopleService ($http, $localForage, serviceConfig) {

        // declarations
        
        var service,
            peoplePath = serviceConfig.endpoints.people;


        // implementations

        /**
         * Gets people data from store based on service config
         */
        function getPeople () {

            return serviceConfig.useLocalForage ? 
                // get from localForage
                getPeopleStorage() :
                // get via XHR
                getPeopleXHR();
        }

        /**
         * Gets people data via http
         */
        function getPeopleXHR () {

            function getPeopleComplete(response) {

                return response.data;
            }

            function getPeopleFailed(error) {

                console.log("XHR Failed for getPeople. " + error.data);
            }

            return $http.get(peoplePath)
                .then(getPeopleComplete)
                .catch(getPeopleFailed);
        }

        /**
         * Gets people data from localForage
         */
        function getPeopleStorage () {

            function getPeopleComplete(data) {

                return data;
            }

            function getPeopleFailed(error) {

                console.log("LocalForage Failed for getPeople. " + error.data);
            }

            return $localForage.getItem(peoplePath)
                .then(getPeopleComplete, getPeopleFailed);
        }

        /**
         * Loads people data via http and caches via localForage
         */
        function cachePeople () {

            function cachePeopleComplete(data) {

                return data;
            }

            function cachePeopleFailed(error) {

                console.log("LocalForage Failed for getPeople. " + error.data);
            }

            return getPeopleXHR().then(function (people) {

                return $localForage.setItem(peoplePath, people)
                    .then(cachePeopleComplete, cachePeopleFailed);
            });
        }


        // return object

        service = {
            getPeople: getPeople,
            cachePeople: cachePeople
        };

        return service;
    }
    peopleService.$inject = ["$http", "$localForage", "serviceConfig"];


    // angular registration
    
    angular.module("myApp")
        .factory("peopleService", peopleService);

}());
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