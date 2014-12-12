//

(function () {
    "use strict";

    angular.module("myApp")
        .controller("PeopleController", function (peopleService, modalService) {

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

        });
}());