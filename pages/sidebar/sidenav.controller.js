angular
    .module('app')
    .controller('AppCtrl', function ($scope, $mdSidenav, UserService, $rootScope, $interval, $location) {
        $scope.toggleLeft = buildToggler('left');
        $scope.loginornot = false;

        $scope.removeheader = function () {
            console.log("logout clicked");
            $scope.loginornot = false;
            $location.path('/login');
        }


        $rootScope.$on("CallParentMethod", function () {
            console.log("Parent called");
            loadCurrentUser();
        });

        $scope.parentmethod = function () {
            // task
            $scope.loginornot = true;

            loadCurrentUser();
        }



        console.log("Sidebar called");

        function buildToggler(componentId) {
            loadCurrentUser();
            return function () {
                $mdSidenav(componentId).toggle();

            };
        }





        loadCurrentUser();


        function loadCurrentUser() {
            let uid;
            console.log("user called");
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