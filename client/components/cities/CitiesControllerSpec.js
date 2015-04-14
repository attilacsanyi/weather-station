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

    it('should have city list on its scope to store the displayed cities', function() {
        expect($scope.cities.cityList).toBeDefined();
    });

    it('should have reverse order by temp on its scope with false', function() {
        expect($scope.cities.reverseSortOrderByTemp).not.toBeTruthy();
    });
});