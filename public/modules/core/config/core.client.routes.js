(function() {
  'use strict';

  angular
    .module('core')
    .config(CoreRoutes);

  CoreRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function CoreRoutes($stateProvider, $urlRouterProvider) {

    // Fall back on url-based routing for redirects and bad url catch-all.
    // Only used on core routes configuration.
    $urlRouterProvider
      .when('/analyze', '/analyze/layout')
      .when('/formulations', '/formulations/list')
      .when('/datasets', '/datasets/list')
      .when('/models', '/models/list')
      .when('/publications', '/publications/list')
      .when('/profile', '/profile/view')
      .otherwise('/');

    // Define states.
    var home_state = {
      abstract: false,
      url: '/',
      controller: 'HomeViewController',
      controllerAs: 'home'
    };

    var anon_state = {
      abstract: false,
      url: '/index',
      templateUrl: 'modules/core/views/anon.client.view.html',
      controller: 'AnonViewController',
      controllerAs: 'anon'
    };

    // Populate provider.
    $stateProvider
      .state('home', home_state)
      .state('anon', anon_state);
  }
})();