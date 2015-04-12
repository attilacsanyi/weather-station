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
        vm.cityList = [new City(1, 'London'), new City(2, 'Manchester'), new City(3, 'Luton'), new City(4, 'Birmingham')];

        // View methods

    }

})();