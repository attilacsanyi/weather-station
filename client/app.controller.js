(function() {
  'use strict';

  angular
  .module('weatherStation')
  .controller('AppController', AppController);

  AppController.$inject = [ '$router', '$location', '$log' ];

  //////////////////////////////
  // APP CONTROLLER
  function AppController($router, $location, $log) {
    var vm = this;
    $log.info('Init AppController');

    // Define App Routing
    $router.config([
          {
            path: '/',
            component: 'cities'
          },
          {
            path: '/city/:id',
            component: 'city'
          }
        ]);
    $location.path('/');

    // View models
    vm.title = 'Weather Station';

  }

})();
