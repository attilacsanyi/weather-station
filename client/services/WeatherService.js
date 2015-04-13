(function() {
    'use strict';

    angular
        .module('weatherStation')
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$q', '$log', '$http', 'City', 'Weather'];

    //////////////////////////////
    // WEATHER SERVICE
    function WeatherService($q, $log, $http, City, Weather) {
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
            var city, weather;
            var jsonpReq = 'http://api.openweathermap.org/data/2.1/weather/city/' + cityId + '?units=metric&callback=JSON_CALLBACK';
            var deferred = $q.defer();
            $http.jsonp(jsonpReq).success(function (data) {

                // Populate city model
                city = new City(data.id, data.name);
                city.setCoordinates(data.coord.lon, data.coord.lat);

                // Populate weather model
                weather = new Weather(data.weather[0].main, data.weather[0].description, data.weather[0].icon);
                weather.setTemperatures(data.main.temp, data.main.temp_min, data.main.temp_max);
                weather.setPressure(data.main.pressure);
                weather.setHumidity(data.main.humidity);

                city.setWeather(weather);

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