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

            this.lon = 0;
            this.lat = 0;
        };

        // Methods

        City.prototype.setCoordinates = function (longitude, latitude) {
            this.lon = longitude;
            this.lat = latitude;
        };

        // Getters

        City.prototype.getId = function () {
            return this.id;
        };

        City.prototype.getName = function () {
            return this.name;
        };

        City.prototype.getLon = function () {
            return this.lon;
        };

        City.prototype.getLat = function () {
            return this.lat;
        };

        return City;
    }

})();