(function() {
  'use strict';

  angular
    .module('analyze')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  // NOTE: Factories do not need to be injected. They are already available through the mcsdss.providers module across the app.
  function DashboardRoutes($stateProvider) {

    // Define states.
    var analyze_state = {
      abstract: true,
      url: '/analyze',
      templateUrl: 'modules/analyze/views/analyze.client.view.html',
      controller: 'AnalyzeViewController',
      controllerAs: 'analyze',
      data: {
        title: 'Analyze'
      },
      resolve: {
        analysisData: function(FormulationRetrieval) {
          return FormulationRetrieval.getFormulation('./data/formulations/bs.formulation.json'); // Replace with formulation id by user.
        },
        analysisConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getAnalysisConfig(analysisData);
        }//,
        // maufConfig: function(FormulationRetrieval, analysisData) {
        //   return FormulationRetrieval.getMaufConfig(analysisData);
        // },
        // datagridConfig: function(FormulationRetrieval, analysisData) {
        //   return FormulationRetrieval.getDatagridConfig(analysisData);
        // },
        // graphConfig: function(FormulationRetrieval, analysisData) {
        //   return FormulationRetrieval.getGraphConfig(analysisData);
        // },
        // mapConfig: function(FormulationRetrieval, analysisData) {
        //   return FormulationRetrieval.getMapConfig(analysisData);
        // }
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
      },
      resolve: {
        maufConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getMaufConfig(analysisData);
        },
        datagridConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getDatagridConfig(analysisData);
        },
        graphConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getGraphConfig(analysisData);
        },
        mapConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getMapConfig(analysisData);
        }
      }
    };

    // Populate provider.
    $stateProvider
      .state('analyze', analyze_state)
      .state('analyze.layout', analyze_layout_state);
  }
})();