(function() {
  'use strict';

    angular
        .module('weatherStation')
        .factory('City', CityModel);

        CityModel.$inject = [ '$log', 'Weather' ];

    //////////////////////////////
    // CITY
    function CityModel($log, Weather) {

        // Constructor
        var City = function (id, name) {
            this.id = id;
            this.name = name;

            this.lon = 0;
            this.lat = 0;

            this.weather = {};
        };

        // Methods

        City.prototype.setCoordinates = function (longitude, latitude) {
            this.lon = longitude;
            this.lat = latitude;
        };

        City.prototype.setWeather = function (weather) {
            this.weather = weather;
        };

        City.prototype.equals = function (other) {
            if (other instanceof City &&
                    other.getId == this.getId() &&
                        other.getName() == this.getName()) return true;
            return false;
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

        City.prototype.getWeather = function () {
            return this.weather;
        };

        return City;
    }

})();