describe('City Controller', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var cityController, $scope;

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();

        cityController =  _$controller_('CityController as city', {
            '$scope': $scope
        });
    }));

    it('should have "self" available on its scope', function() {
        expect($scope.city.self).toBeDefined();
    });

    it('should have "weather" available on its scope', function() {
        expect($scope.city.weather).toBeDefined();
    });
});