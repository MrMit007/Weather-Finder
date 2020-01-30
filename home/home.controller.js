(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)


    HomeController.$inject = ['UserService', '$rootScope', '$scope', '$interval'];
    function HomeController(UserService, $rootScope, $scope) {
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