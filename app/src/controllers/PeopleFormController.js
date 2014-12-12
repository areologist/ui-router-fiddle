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

    // register with angular
    
    angular.module("myApp").controller("PeopleFormController", PeopleFormController);

}());
