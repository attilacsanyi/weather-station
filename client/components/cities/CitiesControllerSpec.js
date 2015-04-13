describe('Cities Controller', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var citiesController, $scope, weatherService;

    beforeEach(inject(function(_$controller_, _$rootScope_, _WeatherService_) {
        $scope = _$rootScope_.$new();
        weatherService = _WeatherService_;

        citiesController =  _$controller_('CitiesController as cities', {
            '$scope': $scope,
            'WeatherService': _WeatherService_
        });
    }));

    it('should have WeatherService available on its scope', function() {
        expect($scope.cities.weatherService).toBeDefined();
    });

    it('should have city list on its scope to store the displayed cities', function() {
        expect($scope.cities.cityList).toBeDefined();
    });

    it('should contains minimum 4 cities initially', function() {
        expect($scope.cities.cityList.length).toBeGreaterThan(3);
    });

    it('should contains objects within the "cityList"', function(){
        var cityList = $scope.cities.cityList;
        for (var i = 0,  len = cityList.length; i < len; i++) {
            expect(cityList[i]).toEqual(jasmine.any(Object));
        }
    });
});