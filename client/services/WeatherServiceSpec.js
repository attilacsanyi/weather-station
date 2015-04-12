describe('Weather Service', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var weatherService, $httpBackend, $log;

    beforeEach(inject(function(_WeatherService_, _$httpBackend_, _$log_) {
        weatherService = _WeatherService_;
        $httpBackend = _$httpBackend_;
        $log = _$log_;
    }));

    it('should be injectable with name "WeatherService"', function() {
        expect(weatherService).toBeDefined();
    });
});