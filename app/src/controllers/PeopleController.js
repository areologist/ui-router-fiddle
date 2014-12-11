//

(function () {
    "use strict";

    angular.module("myApp")
        .controller("PeopleController", function (peopleService) {

            var that = this;
            this.people = [];

            peopleService.getPeople().then(function (data) {

                that.people = data;
            });
        });
}());