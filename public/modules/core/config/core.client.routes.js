(function() {
  'use strict';

  angular
    .module('core')
    .config(CoreRoutes);

  CoreRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function CoreRoutes($stateProvider, $urlRouterProvider) {
    // Fall back on url-based routing for redirects and bad url catch-all.
    $urlRouterProvider
      .when('/formulations', '/formulations/list')
      .when('/datasets', '/datasets/list')
      .when('/models', '/models/list')
      .when('/decisions', '/decisions/list')
      .when('/publications', '/publications/list')
      .when('/profile', '/profile/view')
      .otherwise('/');

    $stateProvider
      .state('home', {
        abstract: false,
        url: '/',
        controller: 'HomeViewController'
      })
      .state('anon', {
        abstract: false,
        url: '/index',
        templateUrl: 'modules/core/views/anon.client.view.html',
        controller: 'AnonViewController'
      });
  }
})();