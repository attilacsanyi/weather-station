(function() {
    'use strict';

    angular
        .module('weatherStation')
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$log'];

    //////////////////////////////
    // WEATHER SERVICE
    function WeatherService($log) {
        $log.info('Init WeatherService');

        var service = {
        };

        return service;

        // Implementation

    }

})();