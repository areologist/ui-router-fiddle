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


    // angular registration
    
    angular.module("myApp")
        .constant("peoplePath", "data/people.json")
        .factory("peopleService", peopleService);

}());