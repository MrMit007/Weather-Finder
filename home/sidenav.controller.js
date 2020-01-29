angular
    .module('app')
    .controller('AppCtrl', function ($scope, $mdSidenav, UserService, $rootScope) {
        $scope.toggleLeft = buildToggler('left');
        loadCurrentUser();


        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function loadCurrentUser() {
            let uid;
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    uid = user[0];
                    console.log("Current id:");
                    console.log(uid.username);
                    $scope.uid = uid.username;
                });
        }

    });