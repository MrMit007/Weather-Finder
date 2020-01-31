angular
    .module('app')
    .controller('AppCtrl', function ($scope, $mdSidenav, UserService, $rootScope, $interval) {
        $scope.toggleLeft = buildToggler('left');
        //loadCurrentUser();


        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        /*function loadCurrentUser() {
            let uid;
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    uid = user[0];
                    console.log("Current ids:");
                    if (user[0]) {
                        console.log(uid.username);
                        $scope.uid = uid.username;
                    }
                });
        }*/

    });