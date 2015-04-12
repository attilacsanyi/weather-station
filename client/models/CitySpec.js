describe('City', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var City;

    beforeEach(inject(function(_City_) {
        City = _City_;
    }));

    it('should contain id and name properties', function(){
        var c = new City(6058560, 'London');
        expect(c.getId()).toEqual(6058560);
        expect(c.getName()).toEqual('London');
    });
});