describe('Cities Controller', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var $citiesController, $scope, weatherService, City;

    beforeEach(inject(function(_$controller_, _$rootScope_, _WeatherService_, _City_) {
        $scope = _$rootScope_.$new();
        weatherService = _WeatherService_;
        City = _City_;

        citiesController =  _$controller_('CitiesController as cities', {
            '$scope': $scope,
            'WeatherService': _WeatherService_
        });
    }));

    it('should have WeatherService available on its scope', function() {
        expect($scope.cities.weatherService).toBeDefined();
    });

    it('should have city list ("cityList") defined to store the displayed cities', function() {
        expect($scope.cities.cityList).toBeDefined();
    });

    it('should contains minimum 4 cities initially', function() {
        expect($scope.cities.cityList.length).toBeGreaterThan(3);
    });

    it('should contain objects within the "cityList"', function(){
        var cityList = $scope.cities.cityList;
        for (var i = 0,  len = cityList.length; i < len; i++) {
            expect(cityList[i]).toEqual(jasmine.any(Object));
        }
        //var c = new City(1, 'dlondon');
    });

    it('should at least contains "London, Luton, Manchester, Birmingham" within the "cityList"', function() {
        var cityList = $scope.cities.cityList;
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
});