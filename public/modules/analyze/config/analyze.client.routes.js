(function() {
  'use strict';

  angular
    .module('analyze')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  function DashboardRoutes($stateProvider) {
    $stateProvider
      .state('analyze', {
        abstract: false,
        url: '/analyze',
        templateUrl: 'modules/analyze/views/analyze.client.view.html',
        controller: 'AnalyzeViewController',
        controllerAs: 'analyze'
      })
      .state('analyze.layout', {
        abstract: false,
        url: '',
        views: {
          'graph': {
            templateUrl: 'modules/analyze/views/analyze.graph.client.view.html',
            controller: 'GraphViewController'
          },
          'map': {
            templateUrl: 'modules/analyze/views/analyze.map.client.view.html',
            controller: 'MapViewController'
          },
          'filters': {
            templateUrl: 'modules/analyze/views/analyze.filters.client.view.html',
            controller: 'FiltersViewController',
            controllerAs: 'filters'
          },
          'datatable': {
            templateUrl: 'modules/analyze/views/analyze.datatable.client.view.html',
            controller: 'DatatableViewController',
            controllerAs: 'datatable'
          }
        }
      });
  }
})();