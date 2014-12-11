
(function () {
    "use strict";

    var app = angular.module("myApp", [
        "ngAnimate",
        "ui.router",
        "LocalForageModule",
        "ui.bootstrap",
        "ngDialog"
    ]);

    app.config( ["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider.otherwise("/dashboard");
      
      $stateProvider
        /**
         * Dashboard router states
         */
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "partials/dashboard.html",
            controller: ["$state", function ($state) {

                this.activeClass = function (name) {

                    return (name === $state.current.name) ? "active" : "";
                };
            }],
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


(function () {
    "use strict";

    angular.module("myApp")
        .controller("NavbarController", ["ngDialog", function (ngDialog) {

            this.openModal = function () {

                ngDialog.open({
                    template: "<h1>Awesome</h1><p>This is a modal dialog of some sort.</p>",
                    className: "ngdialog-theme-default",
                    plain: true
                });
            };
        }]);
}());

//

(function () {
    "use strict";

    angular.module("myApp")
        .controller("PeopleController", ["peopleService", function (peopleService) {

            var that = this;
            this.people = [];

            peopleService.getPeople().then(function (data) {

                that.people = data;
            });
        }]);
}());
/* people data service */

(function () {
    "use strict";

    function peopleService ($http, $localForage, peoplePath) {

        // declarations
        
        var service;


        // implementations

        function getPeople () {

            // get from localForage
            //return getPeopleStorage();

            // get via XHR
            return getPeopleXHR();
        }

        function getPeopleXHR () {

            function getPeopleComplete(response) {

                return response.data;
            }

            function getPeopleFailed(error) {

                //logger.error('XHR Failed for getPeople.' + error.data);
                console.log("XHR Failed for getPeople. " + error.data);
            }

            return $http.get(peoplePath)
                .then(getPeopleComplete)
                .catch(getPeopleFailed);
        }

        function getPeopleStorage () {

            function getPeopleComplete(data) {

                return data;
            }

            function getPeopleFailed(error) {

                //logger.error(...
                console.log("LocalForage Failed for getPeople. " + error.data);
            }

            return $localForage.getItem(peoplePath)
                .then(getPeopleComplete, getPeopleFailed);
        }


        // return object

        service = {
            getPeople: getPeople
        };

        return service;
    }
    peopleService.$inject = ["$http", "$localForage", "peoplePath"];


    // angular registration
    
    angular.module("myApp")
        .constant("peoplePath", "data/people.json")
        .factory("peopleService", peopleService);

}());