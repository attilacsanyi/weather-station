(function() {
  'use strict';

    angular
        .module('weatherStation')
        .factory('Weather', WeatherModel);

        WeatherModel.$inject = [ '$log' ];

    //////////////////////////////
    // WEATHER
    function WeatherModel($log) {

        // Constructor
        var Weather = function (name, description, icon) {

            // Weather conditions
            this.name = name;
            this.description = description;
            this.icon = 'http://openweathermap.org/img/w/' + icon + '.png';

            this.temp = 0;
            this.tempMin = 0;
            this.tempMax = 0;

            this.pressure = 0;
            this.humidity = 0;
        };

        // Methods

        Weather.prototype.setTemperatures = function (temp, tempMin, tempMax) {
            this.temp = temp;
            this.tempMin = tempMin;
            this.tempMax = tempMax;
        };

        // Setters

        Weather.prototype.setPressure = function (pressure) {
            this.pressure = pressure;
        };

        Weather.prototype.setHumidity = function (humidity) {
            this.humidity = humidity;
        };

        // Getters

        Weather.prototype.getName = function () {
            return this.name;
        };

        Weather.prototype.getDescription = function () {
            return this.description;
        };

        Weather.prototype.getIcon = function () {
            return this.icon;
        };

        Weather.prototype.getTemp = function () {
            return this.temp;
        };

        Weather.prototype.getTempMin = function () {
            return this.tempMin;
        };

        Weather.prototype.getTempMax = function () {
            return this.tempMax;
        };

        Weather.prototype.getPressure = function () {
            return this.pressure;
        };

        Weather.prototype.getHumidity = function () {
            return this.humidity;
        };

        return Weather;
    }

})();