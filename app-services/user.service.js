(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];
    function UserService($http) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;


        function GetAll() {
            return $http.get('http://localhost:3000/users/').then(handleSuccess);
        }

        function GetById(id) {
            return $http.get('http://localhost:3000/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('http://localhost:3000/users?username=' + username).then(handleSuccess);
        }

        function Create(user) {

            return $http.post('http://localhost:3000/users/', user).then(handleSuccess);


            /* var deferred = $q.defer();

            $timeout(function () {
                GetByUsername(user.username).then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        console.log("Email ID is already taken.");
                        deferred.resolve({ success: false, message: 'Email ID "' + user.username + '" is already taken' });
                        return deferred.promise;


                    }
                    else {
                        deferred.resolve({ success: true });
                    }

                }).then(function (adduser) {
                    return $http.post('http://localhost:3000/users/', user).then(handleSuccess);
                });

            }, 1000);*/



        }

        function Update(user) {
            return $http.put('http://localhost:3000/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('http://localhost:3000/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            console.log(res.data);
            return res.data;
        }

        /*function handleError(error) {

            console.log("Error:" + error);
            return function () {
                return { success: false, message: error };
            };
        }*/
    }

})();
