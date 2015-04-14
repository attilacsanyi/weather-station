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

        vm.cityList = [];
        vm.reverseSortOrderByTemp = false;

        // View methods

        vm.orderByTemp = orderByTemp;

        WeatherService.defaultCityList().then(function(defaultCities){
            vm.cityList = defaultCities;
        });

        // Implementation

        var orderByTemp = function (city) {
            return city.getWeather().getTemp();
        };

    }

})();