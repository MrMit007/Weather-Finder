(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService, $mdToast, $document) {
        var vm = this;

        vm.register = register;




        function register() {
            vm.dataLoading = true;
            console.log(vm.user);


            UserService.GetByUsername(vm.user.username).then(function (user) {
                if (user[0]) {

                    console.log("UserAlreadycreated");
                    console.log(user);
                    console.log("Hi");

                    alert("User already exists!");
                

                    $location.path('/login');
                }
                else {
                    UserService.Create(vm.user)
                        .then(function (response) {
                            if (response.success) {
                                FlashService.Success('Registration successful', true);
                                $location.path('/login');
                            } else {
                                FlashService.Error(response.message);
                                $location.path('/login');
                                vm.dataLoading = false;
                            }
                        });
                }

            });

        }
    }

})();
