(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('AnalyzeViewController', AnalyzeViewController);

  AnalyzeViewController.$inject = ['$rootScope', '$scope', '$state', '$location', 'Authentication', 'httpq', 'analysisData', 'analysisConfig']; //, 'maufConfig', 'datagridConfig', 'graphConfig', 'mapConfig'];

  function AnalyzeViewController($rootScope, $scope, $state, $location, Authentication, $httpq, analysisData, analysisConfig) { //, maufConfig, datagridConfig, graphConfig, mapConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Analyze';

    // Data objects returned from Service. All work as expected immediately.

    // console.log(analysisData);
    // console.log(analysisConfig);
    // console.log(maufConfig);
    // console.log(datagridConfig);
    // console.log(graphConfig);
    // console.log(mapConfig);

    // Data in the config object is what is expected.
    // Somehow the config object is getting parsed and new properties are being added.
    // Not sure how - results from formulationRetrievalService are identical, even after parsing.
    // Somehow the graph and the table load the exact same data in the Service, it gets parsed.
    // Somewhere between parsing it and loading it into the  config objects, the table data gets reparsed to include extra attrs.
    // These are what is missing from the graph data and causing it to fail when I try and populate with it.
    // This is in addition to the fact that the promises are being resolved before the data is fully loaded and therefore not binding correctly.
    // The data binding seems to be a result of a page reload/refresh versus a route resolve (on initial nav to view).
    // I may need to trigger state resolves to update all views accordingly on state changes.
    // Note: WIll need a mechanism to do this without actually doing a reload so the updated state can be retained and propgated to child views.

    $scope.$on('$stateChangeSuccess', function() {
      var d = new Date();

      $scope.analysisData = analysisData;
      $scope.analysisConfig = analysisConfig;

      var t = d.getTime();
      // console.log('$scope.analysisData: ', d, t, $scope.analysisData);   // debug

      // If config objects are available directly via resolved resources, no need to pass around data, just trigger update sync.
      // Currently using the broadcast to ensure graph populates correctly.

      $scope.$broadcast('analysisDataLoaded', $scope.analysisData.datagridConfig.datasources.tabledata.datum);
      // $scope.$broadcast('analysisDataLoaded', {});
    });

    // Pubsub between Filters and Datatable.
    $scope.$on('CurrentDatasetUpdated', function(event, args) {
      $rootScope.$broadcast('newDatasetSelected', args);
    });

    // Need to rearchitect these once a better filter display and generalized method have been implemented.
    // Event should indicate the dimension being changed so it is generalized.
    $scope.$on('SUFWeightDim1Update', function(event, args) {
      // console.log('SUFWeightDim1Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF1Weight', args);
    });

    $scope.$on('SUFWeightDim2Update', function(event, args) {
      // console.log('SUFWeightDim2Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF2Weight', args);
    });

    $scope.$on('SUFWeightDim3Update', function(event, args) {
      // console.log('SUFWeightDim3Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF3Weight', args);
    });

    $scope.$on('MUFWeightUpdate', function(event, args) {
      // console.log('MUFWeightUpdate event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newMUFWeight', args);
    });

    // PubSub between Datatable and Graph.
    $scope.$on('currentDatatableTarget', function(event, args) {
      $rootScope.$broadcast('newDatatableTarget', args[0]);       // console.log('you touched the datatable at row: ' + args[0]);
    });

    $scope.$on('clearDatatableTarget', function(event, args) {
      $rootScope.$broadcast('removeDatatableTarget', args[0]);    // console.log('you stopped touching the datatable row: ' + args[0]);
    });

    // PubSub between Graph and Map.
    $scope.$on('currentGraphTarget', function(event, args) {
      $rootScope.$broadcast('addMapTarget', args);                // console.log('you touched the graph at record: ' + args);
    });

    $scope.$on('clearGraphTarget', function(event, args) {
      $rootScope.$broadcast('removeMapTarget', args);             // console.log('you stopped touching the graph record: ' + args[0]);
    });

    // Pubsub between Datatable and Map.
    // NOTE: There is no pubsub between Datatable and Map due to incongruous linkages (at this time).
  }
})();
