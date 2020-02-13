(function () {
    'use strict';

    angular
        .module('app')
        .factory('WeatherapiService', WeatherapiService);

    WeatherapiService.$inject = ['$http'];
    function WeatherapiService($http) {

        var service = {};

        service.GetWeatherData = GetWeatherData;

        return service;

        console.log("Weather Service");

        function GetWeatherData(cities) {
            console.log("cities");
            console.log(cities);
            let arr = [];
            var i = 0;

            while (cities[i]) {
                console.log(cities);

                console.log("http://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc");
                let weturl = "http://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&APPID=e4fbbdc28e9c62296fed91870dfc65dc";

                let wetdata = [];

                fetch(weturl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((wetdata) => {
                        //console.log(wetdata);
                        // JSON.stringify(wetdata);
                        console.log(wetdata);
                        arr.push(wetdata);
                        console.log(arr);
                    });
                i++;
            }
            return arr;
        }

        function handleSuccess(res) {
            return res.data;
        }






    }

})();
