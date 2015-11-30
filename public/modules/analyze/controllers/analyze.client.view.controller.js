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

    $scope.$on('$stateChangeSuccess', function() {
      $scope.analysisData = analysisData;
      $scope.analysisConfig = analysisConfig;

      // Data objects returned from Service. All work as expected immediately.
      // Data in the config object is what is expected.
      // Somehow the config object is getting parsed and new properties are being added.
      // Not sure how - results from formulationRetrievalService are identical, even after parsing.

      console.log(analysisData);
      // console.log(analysisConfig);

      // console.log(maufConfig);
      // console.log(datagridConfig);
      // console.log(graphConfig);
      // console.log(mapConfig);

      // This also works every time.
      console.log($scope.analysisData);

      // Confusion starts here: These are both either properly defined or empty depending on how async times out.
      // console.log($scope.analysisData.datagridConfig.datasources.tabledata.datum);
      // console.log($scope.analysisData.graphConfig.datasources.graphdata.datum);

      // Somehow the graph and the table load the exact same data in the Service, it gets parsed.
      // Somewhere between parsing it and loading it into the above config objects, the table data gets reparsed to include extra attrs.
      // These are what is missing from the graph data and causing it to fail when I try and populate with it.
      // This is in addition to the fact tat the promises are being resolved before the data is fully loaded and therefore not binding correctly.

      $scope.$broadcast('analysisDataLoaded', $scope.analysisData.datagridConfig.datasources.tabledata.datum);
      // $scope.$broadcast('analysisDataLoaded', {});             // If config objects are available directly via resolved resources, no need to pass around data, just trigger update sync.
    });

    // PubSub between Graph and Map.
    $scope.$on('currentGraphTarget', function(event, args) {
      $rootScope.$broadcast('addMapTarget', args);                // console.log('you touched the graph at record: ' + args);
    });

    $scope.$on('clearGraphTarget', function(event, args) {
      $rootScope.$broadcast('removeMapTarget', args);             // console.log('you stopped touching the graph record: ' + args[0]);
    });

    // PubSub between Datatable and Graph.
    $scope.$on('currentDatatableTarget', function(event, args) {
      $rootScope.$broadcast('newDatatableTarget', args[0]);       // console.log('you touched the datatable at row: ' + args[0]);
    });

    $scope.$on('clearDatatableTarget', function(event, args) {
      $rootScope.$broadcast('removeDatatableTarget', args[0]);    // console.log('you stopped touching the datatable row: ' + args[0]);
    });

    // NOTE: There is no pubsub between Datatable and Map due to incongruous linkages (at this time).
  }
})();
