(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;

        return service;


        function GetAll() {
            return $http.get('http://localhost:3000/users/').then(handleSuccess);
        }

        function GetById(id) {
            return $http.get('http://localhost:3000/users/' + id).then(handleSuccess);
        }

        function GetByUsername(username) {
            return $http.get('http://localhost:3000/users?username=' + username).then(handleSuccess);
        }

        function Create(user) {
            return $http.post('http://localhost:3000/users/', user).then(handleSuccess);
        }

        function handleSuccess(res) {
            return res.data;
        }
    }

})();
