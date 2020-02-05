﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)


    HomeController.$inject = ['UserService', '$rootScope', '$scope', '$mdDialog', '$http'];
    function HomeController(UserService, $rootScope, $scope, $mdDialog, $http) {
        var vm = this;
        vm.user = null;
        $scope.cities = [];
        $scope.parseInt = parseInt;

        $scope.total = function(citytemp) { 
            return (parseInt(citytemp) -273)
          }

        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        $scope.sharedsuccess = false;
        $scope.showPrompt = function (ev, city) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('Enter Email ID to share')
                .textContent('Bowser is a common name.')
                .placeholder('Email')
                .ariaLabel('Email')
                .initialValue('')
                .targetEvent(ev)
                .ok('Share')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                console.log(result + " is shared of city:");
                console.log(city.name);
                let cityname = city.name;
                console.log(vm.allUsers[0].username);

                var i = 0;

                console.log(vm.allUsers[2]);
                var element = 0;

                console.log(vm.allUsers);
                for (element in vm.allUsers) {

                    if (result === vm.allUsers[element].username.toString()) {
                        console.log("user found");
                        console.log("1");

                        if (!vm.allUsers[element].sharedcity) {
                            console.log("2");

                            let sharedcityarray = [cityname];
                            console.log("3");
                            vm.allUsers[element].sharedcity = sharedcityarray;

                            console.log(vm.allUsers[element]);
                            console.log("4");
                            $scope.sharedsuccess = true;
                            return $http.put('http://localhost:3000/users/' + vm.allUsers[element].id.toString(), vm.allUsers[element]).then(handleSuccess);
                            console.log("5");
                        }
                        else {
                            console.log("5");

                            if ((vm.allUsers[element].sharedcity).includes(cityname)) {
                                console.log("6");
                                $scope.sharedsuccess = true;

                                console.log("Element already exist");
                            }
                            else {
                                console.log("7");

                                (vm.allUsers[element].sharedcity).push(cityname);
                                console.log("8");
                                $scope.sharedsuccess = true;

                                return $http.put('http://localhost:3000/users/' + vm.allUsers[element].id.toString(), vm.allUsers[element]).then(handleSuccess);
                            }
                        }

                    }
                    else {
                        console.log("user Not found");
                    }
                    element++;
                }



            }, function () {
                console.log("Failed");
            });
        };


        function handleSuccess(res) {
            console.log(res.data);
            return res.data;
        }

        $scope.datatype = "false";
        $scope.displabel = "Grid";

        $scope.onChange = function (cbState) {
            $scope.datatype = cbState;
            if ($scope.datatype) {
                $scope.displabel = "List";
                console.log("List clicked");
                loadInList();
            }
            else {
                $scope.displabel = "Grid";
                console.log("Grid clicked");
                loadInGrid();
            }
        };

        initController();


        function initController() {
            loadCurrentUser();
        }



        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                    console.log("Current User:");
                    console.log(vm.user)
                })
                .then(function () {
                    console.log(vm.user.city);
                    // console.log(vm.user.city[]);
                    loadInGrid();
                });
        }


        function loadInGrid() {
            $scope.cities = [];

            var i = 0;

            let arr = [];

            while (vm.user.city[i]) {
                console.log(vm.user.city[i]);

                //console.log("http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.city[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.city[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

                let wetdata = [];

                fetch(weturl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((wetdata) => {
                        //console.log(wetdata);
                        // JSON.stringify(wetdata);
                        console.log(wetdata);
                        arr.push(wetdata);
                        console.log(arr);
                        loadAllUsers();
                    });
                i++;
            }
            $scope.cities = arr;
        }


        function loadInList() {
            $scope.CTS = [];

            var i = 0;

            let arr = [];

            while (vm.user.city[i]) {
                console.log("   LIT");

                //console.log("http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.city[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.city[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

                let wetdata = [];

                fetch(weturl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((wetdata) => {
                        //console.log(wetdata);
                        // JSON.stringify(wetdata);
                        console.log(wetdata);
                        arr.push(wetdata);
                        console.log(arr);
                        loadAllUsers();
                    });
                i++;
            }
            $scope.CTS = arr;


        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    console.log("allusers:")
                    console.log(users);
                    vm.allUsers = users;
                    console.log("All user:");
                    console.log(vm.allUsers);
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }
    }

})();