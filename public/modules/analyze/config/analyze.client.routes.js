(function() {
  'use strict';

  angular
    .module('analyze')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  function DashboardRoutes($stateProvider, LoadFormulationService) {

    // Define states.
    var analyze_state = {
      abstract: false,
      url: '/analyze',
      templateUrl: 'modules/analyze/views/analyze.client.view.html',
      controller: 'AnalyzeViewController',
      controllerAs: 'analyze',
      data: {
        title: 'Analyze'
      },
      resolve: {
        formulationData: function(LoadFormulationService) {
          return LoadFormulationService.sayHello();
        },
        helloFactory: function(TestFactory) {
          return TestFactory.helloFactory;
        }
      }
    };

    var analyze_layout_state = {
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
    };

    // Populate provider.
    $stateProvider
      .state('analyze', analyze_state)
      .state('analyze.layout', analyze_layout_state);
  }
})();