describe('City Model', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation'));

    var city, City, Weather;

    // Initialize test city
    beforeEach(inject(function(_City_, _Weather_) {
        City = _City_;
        Weather = _Weather_;
        city = new City(6058560, 'London');
    }));

    // Getters

    it('should contains id and name properties', function(){
        expect(city.getId()).toEqual(6058560);
        expect(city.getName()).toEqual('London');
    });

    it('should contains lon and lat properties', function(){
        expect(city.getLon()).toEqual(0);
        expect(city.getLat()).toEqual(0);
    });

    it('should contains weather property', function(){
        expect(city.getWeather()).toEqual({});
    });

    // Methods

    it('has "setCoordinates" method for setting longitude and latitude properties', function(){
        expect(city.setCoordinates).toBeDefined();
    });

    it('"setCoordinates" method should set longitude and latitude properties', function(){
        var lon = 5;
        var lat = 6;
        city.setCoordinates(lon, lat);

        expect(city.getLon()).toEqual(lon);
        expect(city.getLat()).toEqual(lat);
    });

    it('has "setWeather" method for setting weather information property', function(){
        expect(city.setWeather).toBeDefined();
    });

    it('"setWeather" method should set weather property', function(){
        var weather = new Weather('Clouds', 'few clouds', '02d');
        city.setWeather(weather);

        expect(city.getWeather()).toEqual(weather);
    });

    it('has "equals" method for comparing with other objects', function(){
        expect(city.equals).toBeDefined();
    });

    it('"equals" method properly compare city with other objects', function(){

        // Not equal cases
        expect(city.equals(2)).not.toBeTruthy();
        expect(city.equals({})).not.toBeTruthy();
        expect(city.equals(new City(234, 'London1'))).not.toBeTruthy();
        expect(city.equals(new City(6058560, 'London1'))).not.toBeTruthy();
        expect(city.equals(new City(234, 'London'))).not.toBeTruthy();

        // Equal case
        expect(city.equals(new City(6058560, 'London'))).toBeTruthy();
    });
});