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


    // angular registration
    
    angular.module("myApp")
        .factory("peopleService", peopleService);

}());