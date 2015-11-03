(function() {
  'use strict';
  // Setting up routes.
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
      .when('/analyze', '/analyze')   // This is required to refresh the view on nav change. Not yet sure why...
      .when('/decisions', '/decisions/list')
      .when('/publications', '/publications/list')
      .when('/profile', '/profile/view')
      .otherwise('/');

    // Use state routing primarilly.
    $stateProvider
      .state('home', {
        abstract: false,
        url: '/',
        controller: 'HomeViewController'
      })
      .state('anon', {
        abstract: false,
        url: '/',
        templateUrl: 'modules/core/views/anon.client.view.html',
        controller: 'AnonViewController'
      })
      .state('dashboard', {
        abstract: false,
        // url: '/',
        templateUrl: 'modules/core/views/user.client.view.html',
        controller: 'UserViewController'
      })
      .state('dashboard.profile-view', {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
        controller: 'SettingsController'
      })
      .state('dashboard.main', {
        abstract: false,
        url: '/dashboard',
        templateUrl: 'modules/core/views/dashboard/dashboard.client.view.html',
        controller: 'DashboardViewController'
      })
      // ANALYZE
      .state('dashboard.analyze', {
        abstract: false,
        url: '/analyze',
        templateUrl: 'modules/core/views/analyze/analyze.client.view.html',
        controller: 'AnalyzeViewController'
      })
      .state('dashboard.analyze.layout', {
        abstract: false,
        url: '',
        views: {
          'graph': {
              templateUrl: 'modules/core/views/analyze/analyze.graph.client.view.html',
              controller: 'GraphViewController'
           },
           'map': {
              templateUrl: 'modules/core/views/analyze/analyze.map.client.view.html',
              controller: 'MapViewController'
          },
          'datatable': {
              templateUrl: 'modules/core/views/analyze/analyze.datatable.client.view.html',
              controller: 'DatatableViewController'
          }
        }
      });
  }
})();