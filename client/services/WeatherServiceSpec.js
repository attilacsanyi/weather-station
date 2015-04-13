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

        // Call the api
        weatherService.defaultCityList().then(function(defaultCities){
            expect(defaultCities.length).toBeGreaterThan(3);
        });
    });

    it('"defaultCityList" api should at least contains "London, Luton, Manchester, Birmingham"', function() {
        var london = new City(6058560, 'London');
        var luton = new City(2643339, 'Luton');
        var manchester = new City(4207625, 'Manchester');
        var birmingham = new City(2655603, 'Birmingham');

        // Call the api
        weatherService.defaultCityList().then(function(defaultCities){
            var foundCities = [];
            var city, l =0;
            for (var i = 0,  len = defaultCities.length; i < len; i++) {
                city = defaultCities[i];
                switch (city.getId()) {
                    case 6058560:  if (city.equals(london)) foundCities.push(city); break;
                    case 2643339:  if (city.equals(luton)) foundCities.push(city); break;
                    case 4207625:  if (city.equals(manchester)) foundCities.push(city); break;
                    case 2655603:  if (city.equals(birmingham)) foundCities.push(city); break;
                    default: break;
                }
            }
            expect(foundCities).toEqual(jasmine.arrayContaining([ london, luton, manchester, birmingham ]));
        });
    });

    // API getCityById 

    it('has "getCityById" api to return data for one city', function() {
        expect(weatherService.getCityById(1234)).toBeDefined();
    });

    it('"getCityById" should return the one result', inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;

        // Mock response
        var data = {
            id: 1234,
            name: 'City Name',
            coord: {
                lon: 34,
                lat: 678
            },
            main: {
                temp: 28,
                temp_min: 26,
                temp_max: 30,
                pressure: 1000,
                humidity: 50
            },
            weather: [
                {
                    main: 'sun',
                    description: 'lot of sun',
                    icon: '02b'
                }
            ]
        };
        var cityId = data.id;

        // Prepare expected service call for forcast by city id
        $httpBackend
            .expectJSONP('http://api.openweathermap.org/data/2.1/weather/city/' + cityId + '?units=metric&callback=JSON_CALLBACK')
            .respond(data);

        // Call the service method
        weatherService.getCityById(cityId).then(function(city){

            // Verify id and name
            expect(city.getId()).toEqual(data.id);
            expect(city.getName()).toEqual(data.name);

            // Verify lon and lat
            expect(city.getLon()).toEqual(data.coord.lon);
            expect(city.getLat()).toEqual(data.coord.lat);

            // Verify weather data
            var weather = city.getWeather();
            expect(weather).toBeDefined();

            // Verify temperatures
            expect(weather.getTemp()).toEqual(data.main.temp);
            expect(weather.getTempMin()).toEqual(data.main.temp_min);
            expect(weather.getTempMax()).toEqual(data.main.temp_max);

            // Verify pressure and humidity
            expect(weather.getPressure()).toEqual(data.main.pressure);
            expect(weather.getHumidity()).toEqual(data.main.humidity);

        });

        // Simulate response
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

});