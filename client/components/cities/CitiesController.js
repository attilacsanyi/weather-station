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

        WeatherService.defaultCityList().then(function(defaultCities){
            vm.cityList = defaultCities;
        });

        var orderByTemp = function (city) {
            return city.getWeather().getTemp();
        };
        vm.orderByTemp = orderByTemp;

    }

})();