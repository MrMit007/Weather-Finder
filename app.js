(function () {
    "use strict";

    angular
        .module("app", ["ngRoute", "ngCookies", "ngMaterial", "ngMessages", "ngMessages"])
        .config(config)
        .run(run)


    config.$inject = ["$routeProvider", "$locationProvider"];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                controller: "HomeController",
                templateUrl: "pages/home/home.view.html",
                controllerAs: "vm"
            })

            .when("/login", {
                controller: "LoginController",
                templateUrl: "pages/login/login.view.html",
                controllerAs: "vm"
            })

            .when("/register", {
                controller: "RegisterController",
                templateUrl: "pages/register/register.view.html",
                controllerAs: "vm"
            })

            .when("/add", {
                controller: "AddController",
                templateUrl: "pages/add/add.view.html",
                controllerAs: "vm"
            })

            .when("/sharedcity", {
                controller: "SharedcityController",
                templateUrl: "pages/sharedcity/sharedcity.view.html",
                controllerAs: "vm"
            })

            .otherwise({ redirectTo: "/login" });
    }

    run.$inject = ["$rootScope", "$location", "$cookies", "$http", "$interval"];
    function run($rootScope, $location, $cookies, $http, $interval) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject("globals") || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common["Authorization"] =
                "Basic " + $rootScope.globals.currentUser.authdata;
        }


        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage =
                $.inArray($location.path(), ["/login", "/register"]) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path("/login");
            }
        });
    }

})();

