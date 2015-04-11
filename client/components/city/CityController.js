(function() {
    'use strict';

    angular
        .module('weatherStation')
        .controller('CityController', CityController);

    CityController.$inject = [ '$routeParams', '$log' ];

    //////////////////////////////
    // CITY CONTROLLER
    function CityController($routeParams, $log) {
        $log.info('Init CityController');
        var vm = this;

    }

})();
