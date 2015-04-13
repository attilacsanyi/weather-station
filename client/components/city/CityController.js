(function() {
    'use strict';

    angular
        .module('weatherStation')
        .controller('CityController', CityController);

    CityController.$inject = [ '$routeParams', 'WeatherService',  '$log' ];

    //////////////////////////////
    // CITY CONTROLLER
    function CityController($routeParams, WeatherService, $log) {
        $log.info('Init CityController');
        var vm = this;

        // View models

        vm.self = {};
        vm.weather = {};

        // View methods

        WeatherService.getCityById($routeParams.id).then(function(city){
            vm.self = city;
            vm.weather = city.getWeather();
        });

    }

})();
