describe('App Controller', function() {

    // First, we load the app's module
    beforeEach(module('weatherStation')); 

    var $appController, $scope, $location, $router, $log;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$router_, _$location_, _$log_) {
        $scope = _$rootScope_.$new();
        $router = _$router_;
        $location = _$location_;
        $log = _$log_;

        appController =  _$controller_('AppController as app', {
            '$scope': $scope,
            '$router': $router,
            '$location': $location,
            '$log': $log
        });
    }));

    it('should define title of "Weather Station"', function() {
        expect($scope.app.title).toEqual('Weather Station');
    });
});