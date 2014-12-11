
(function () {
    "use strict";

    var app = angular.module("myApp", [
        "ngAnimate",
        "ui.router",
        "LocalForageModule",
        "ui.bootstrap",
        "ngDialog"
    ]);

    app.config( function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider.otherwise("/dashboard");
      
      $stateProvider
        /**
         * Dashboard router states
         */
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "partials/dashboard.html",
            controller: function ($state) {

                this.activeClass = function (name) {

                    return (name === $state.current.name) ? "active" : "";
                };
            },
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
    })

    //
    // localForage config
    //
    .config(["$localForageProvider", function ($localForageProvider) {

        $localForageProvider.setNotify(true, true); // itemSet, itemRemove
    }]);
}());
