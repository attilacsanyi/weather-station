(function() {
    'use strict';

    angular
        .module('weatherStation')
        .controller('CitiesController', CitiesController);

    CitiesController.$inject = [ '$log', 'WeatherService', 'City' ];

    //////////////////////////////
    // CITIES CONTROLLER
    function CitiesController($log, WeatherService, City) {
        $log.info('Init CitiesController');
        var vm = this;

        // View models

        vm.weatherService = WeatherService;
        vm.cityList = vm.weatherService.defaultCityList();

        // View methods

    }

})();