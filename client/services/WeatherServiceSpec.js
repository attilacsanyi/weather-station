describe('Weather Service', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var weatherService, $httpBackend, City, $log;

    beforeEach(inject(function(_WeatherService_/*, _$httpBackend_*/, _City_, _$log_) {
        weatherService = _WeatherService_;
        //$httpBackend = _$httpBackend_;
        City = _City_;
        $log = _$log_;
    }));

    /*afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });*/

    it('should be injectable with name "WeatherService"', function() {
        expect(weatherService).toBeDefined();
    });

    // API defaultCityList

    it('has "defaultCityList" api to return default city list', function() {
        expect(weatherService.defaultCityList()).toBeDefined();
    });

    it('"defaultCityList" api should contains minimum 4 cities initially', function() {
        expect(weatherService.defaultCityList().length).toBeGreaterThan(3);
    });

    it('"defaultCityList" api should at least contains "London, Luton, Manchester, Birmingham"', function() {
        var cityList = weatherService.defaultCityList();
        var defaultCities = [ new City(6058560, 'London'), new City(2643339, 'Luton'), new City(4207625, 'Manchester'), new City(2655603, 'Birmingham') ];
        var foundCities = [];
        var city;
        for (var i = 0,  len = cityList.length; i < len; i++) {
            city = cityList[i];
            var cityName = city.getName();
            switch (cityName) {
                case 'London':      foundCities.push(new City(6058560, 'London')); break;
                case 'Luton':       foundCities.push(new City(2643339, 'Luton')); break;
                case 'Manchester':  foundCities.push(new City(4207625, 'Manchester')); break;
                case 'Birmingham':  foundCities.push(new City(2655603, 'Birmingham')); break;
                default: break;
            }
        }
        expect(foundCities).toEqual(jasmine.arrayContaining(defaultCities));
    });

    // API getCityById 

    it('has "getCityById" api to return data for one city', function() {
        expect(weatherService.getCityById(1234)).toBeDefined();
    });

    it('"getCityById" should return the one result', inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;

        // Mock response
        var cityId = 1234;
        var cityName = 'City Name';
        var lon = 34;
        var lat = 678;

        var theOneCity = new City(cityId, cityName);
        theOneCity.setLocation(lon, lat);

        // Prepare expected service call for forcast by city id
        $httpBackend
            .expectJSONP('http://api.openweathermap.org/data/2.1/weather/city/' + cityId + '?units=metric&callback=JSON_CALLBACK')
            .respond(theOneCity);

        // Call the service method
        weatherService.getCityById(cityId).then(function(city){

            // Verify id and name
            expect(city.getId()).toEqual(cityId);
            expect(city.getName()).toEqual(cityName);

            // Verify lon and lat
            expect(city.getLon()).toEqual(lon);
            expect(city.getLat()).toEqual(lat);
        });

        // Simulate response
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

});