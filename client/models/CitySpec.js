describe('City Model', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation'));

    var city, City;

    // Initialize test city
    beforeEach(inject(function(_City_) {
        City = _City_;
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

    // Methods

    it('has "setCoordinates" api for setting longitude and latitude properties', function(){
        expect(city.setCoordinates).toBeDefined();
    });

    it('"setCoordinates" api should set longitude and latitude properties', function(){
        var lon = 5;
        var lat = 6;
        city.setCoordinates(lon, lat);

        expect(city.getLon()).toEqual(lon);
        expect(city.getLat()).toEqual(lat);
    });
});