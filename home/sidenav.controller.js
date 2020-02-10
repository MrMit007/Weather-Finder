angular
    .module('app')
    .controller('AppCtrl', function ($scope, $mdSidenav, UserService, $rootScope, $interval) {
        $scope.toggleLeft = buildToggler('left');
        $scope.loginornot = false;

        function buildToggler(componentId) {
            loadCurrentUser();
            return function () {
                $mdSidenav(componentId).toggle();

            };
        }


        $interval(function () {
            loadCurrentUser();
        }, 100);


        function loadCurrentUser() {
            let uid;
            try {
                UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        uid = user[0];
                        // console.log("Current ids:");
                        if (user[0]) {
                            //console.log(uid.username);
                            $scope.uidd = uid.username;
                        }
                        $scope.loginornot = true;
                    });
            } catch (error) {
                $scope.loginornot = false;  
                //console.log(error);
            }
        }
    });