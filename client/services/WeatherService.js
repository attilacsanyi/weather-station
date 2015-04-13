(function() {
    'use strict';

    angular
        .module('weatherStation')
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$q', '$log', '$http', 'City'];

    //////////////////////////////
    // WEATHER SERVICE
    function WeatherService($q, $log, $http, City) {
        $log.info('Init WeatherService');

        var service = {
            defaultCityList: defaultCityList,
            getCityById: getCityById
        };

        return service;

        // Implementation

        function defaultCityList () {
            return [ new City(6058560, 'London'), new City(2643339, 'Luton'), new City(4207625, 'Manchester'), new City(2655603, 'Birmingham') ];
        }

        function getCityById (cityId) {
            var city;
            var jsonpReq = 'http://api.openweathermap.org/data/2.1/weather/city/' + cityId + '?units=metric&callback=JSON_CALLBACK';
            var deferred = $q.defer();
            $http.jsonp(jsonpReq).success(function (data) {
                city = new City(data.id, data.name);
                city.setCoordinates(data.coord.lon, data.coord.lat);

                deferred.resolve(city);
            }).error(function (data, status, headers, config) {
                var reason = 'Something went wrong during calling forecast data by city id';
                deferred.reject(reason);
                throw new Error(reason);
            });

            return deferred.promise;
        }
    }

})();