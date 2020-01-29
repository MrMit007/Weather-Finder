(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)


    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        loadCurrentUser();
        loadAllUsers();

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                    console.log("Current User:");
                    console.log(vm.user)
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

    }

})();