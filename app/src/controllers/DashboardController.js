// dashboard

(function () {
    "use strict";

    angular.module("myApp")
        .controller("DashboardController", function ($state, peopleService) {

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
        });
}());