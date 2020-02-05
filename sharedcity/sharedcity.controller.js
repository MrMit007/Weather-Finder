(function () {
    'use strict';

    angular
        .module('app')
        .controller('SharedcityController', SharedcityController);


    SharedcityController.$inject = ['UserService', '$rootScope', '$scope', '$mdDialog', '$http'];
    function SharedcityController(UserService, $rootScope, $scope, $mdDialog, $http) {
        var vm = this;
        vm.user = null;
        $scope.cities = [];
        vm.allUsers = [];
        vm.deleteUser = deleteUser;


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
                    if (vm.user.sharedcity) {
                        console.log(vm.user.sharedcity);
                        // console.log(vm.user.city[]);
                        console.log("111");
                        $scope.citysharedby = vm.user.sharedby;
                        loadInGrid();
                    }
                    else {
                        //  alert("No city shared");
                    }
                });
        }


        async function loadInGrid() {
            console.log("1");
            $scope.cities = [];

            var i = 0;

            let arr = [];

            while (vm.user.sharedcity[i]) {
                console.log(vm.user.sharedcity[i]);
                //  $scope.sharedby[i] = vm.user.sharedby[i];

                console.log(1000);
                // console.log(vm.user.sharedby[i]);

                //console.log("http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.sharedcity[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.sharedcity[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

                let wetdata = [];

                await fetch(weturl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((wetdata) => {
                        //console.log(wetdata);
                        // JSON.stringify(wetdata);
                        console.log(wetdata);
                        arr.push(wetdata);
                        console.log(arr);
                    });
                i++;
            }
            $scope.cities = arr;
        }


        function loadInList() {
            $scope.CTS = [];

            var i = 0;

            let arr = [];

            while (vm.user.sharedcity[i]) {
                console.log("   LIT");

                //console.log("http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.sharedcity[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + vm.user.sharedcity[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

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