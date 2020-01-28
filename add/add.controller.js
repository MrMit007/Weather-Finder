(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddController', AddController)
        .directive('carddisp', function () {
            return {
                templateUrl: '/add/carddisp.html'
            };
        });

    function AddController($timeout, $q, $log, $scope, $interval, UserService, $rootScope, $http) {
        var self = this;

        self.simulateQuery = false;
        self.isDisabled = false;

        var auto = $interval(function () { }, 100);

        var userid;
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    self.user = user[0];
                    userid = self.user.id;
                    console.log(self.user.username);
                });
        }

        $scope.addcity = function () {
            console.log($scope.city);
            if (!self.user.city) {
                let cityarray = [$scope.city];
                self.user.city = cityarray;
                return $http.put('http://localhost:3000/users/' + userid, self.user).then(handleSuccess);
            }
            else {
                if ((self.user.city).includes($scope.city)) {
                    console.log("Element already exist");
                }
                else {
                    (self.user.city).push($scope.city);
                    return $http.put('http://localhost:3000/users/' + userid, self.user).then(handleSuccess);
                }
            }
        }

        // list of `state` value/display objects
        self.states = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;
        loadCurrentUser();
        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));

            $scope.cardvisibility = true;
            if (item) {
                console.log(item.value);
                console.log("http://api.openweathermap.org/data/2.5/weather?q=" + item.value + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + item.value + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

                let wetdata = [];

                fetch(weturl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((wetdata) => {
                        console.log(wetdata.main.temp);
                        console.log(wetdata.main.temp_min);
                        console.log(wetdata.main.temp_max);
                        console.log(wetdata.weather[0].main);
                        console.log(wetdata.name);

                        $scope.city = wetdata.name;
                        $scope.temp = wetdata.main.temp;
                        $scope.weather = wetdata.weather[0].main;
                        $scope.imagePath = "../img/" + wetdata.weather[0].main.toLowerCase() + ".png";
                        $scope.tempmin = wetdata.main.temp_min;
                        $scope.tempmax = wetdata.main.temp_max;
                    });

                console.log("over");
            }

        }

        function handleSuccess(res) {
            console.log(res.data);
            return res.data;
        }


        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }
    }
})();


/**
Copyright 2018 Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be found
in the LICENSE file at http://material.angularjs.org/HEAD/license.
**/