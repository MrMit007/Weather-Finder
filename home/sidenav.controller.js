angular
    .module('app')
    .controller('AppCtrl', function ($scope, $mdSidenav, UserService, $rootScope) {
        $scope.toggleLeft = buildToggler('left');
        loadCurrentUser();


        function buildToggler(componentId) {
            loadCurrentUser();
            return function () {
                $mdSidenav(componentId).toggle();

            };
        }

        function loadCurrentUser() {
            let uid;
            try {
                UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        uid = user[0];
                        console.log("Current ids:");
                        if (user[0]) {
                            console.log(uid.username);
                            $scope.uidd = uid.username;
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    });