(function() {
  'use strict';

    angular
        .module('weatherStation')
        .factory('City', CityModel);

        CityModel.$inject = [ '$log' ];

    //////////////////////////////
    // CITY
    function CityModel($log) {

        // Constructor
        var City = function (id, name) {
            this.id = id;
            this.name = name;
        };

        // Getters

        City.prototype.getId = function () {
            return this.id;
        };

        City.prototype.getName = function () {
            return this.name;
        };

        return City;
    }

})();