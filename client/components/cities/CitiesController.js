(function() {
    'use strict';

    angular
        .module('weatherStation')
        .controller('CitiesController', CitiesController);

    CitiesController.$inject = [ '$log', 'WeatherService'];

    //////////////////////////////
    // CITIES CONTROLLER
    function CitiesController($log, WeatherService) {
        $log.info('Init CitiesController');
        var vm = this;

        // View models

        vm.weatherService = WeatherService;
        vm.cityList = vm.weatherService.defaultCityList();

        // View methods

    }

})();