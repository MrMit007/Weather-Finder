(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)


    HomeController.$inject = ['UserService', '$rootScope', '$scope'];
    function HomeController(UserService, $rootScope, $scope) {
        var vm = this;
        vm.user = null;
        $scope.cities = [];
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
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
                    $scope.cities = [];
                    var i = 0;
                    while (vm.user.city[i]) {
                        $scope.cities.push(vm.user.city[i]);
                        $scope.temp = 10;
                        i++;
                    }
                    //$scope.cities = (JSON.stringify(vm.user.city));

                });
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