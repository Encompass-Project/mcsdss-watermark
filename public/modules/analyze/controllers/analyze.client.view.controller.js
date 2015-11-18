(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('AnalyzeViewController', AnalyzeViewController);

  AnalyzeViewController.$inject = ['$rootScope', '$scope', '$state', '$location', 'Authentication', 'httpq', 'analysisData'];

  function AnalyzeViewController($rootScope, $scope, $state, $location, Authentication, $httpq, analysisData) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Analyze';
    // console.log($scope.currentRoute);
    $state.go('analyze.layout'); // Required to get nested named views to populate correctly. Not routing correctly from routes.js without this.

    // Manual data loading.
    // $scope.parseCsvData = parseCsvData;
    $scope.sourceFile_A = './data/BSGAM_Heads_Wells_Drains_Zones_Master.csv';
    // $scope.sourceData = {};

    $httpq.get($scope.sourceFile_A)
      .then(function(data) {
        // $scope.parseCsvData(data);
      })
      .catch(function(data, status) {
        console.error('Load error', response.status, response.data);
      })
      .finally(function() {
        // console.log($scope.sourceData);
        // Data is available here to inject into sub-controllers for Graph, Map and Datatable.
        // console.log('Analysis data loaded. Broadcasting...');
        // $scope.$broadcast('analysisDataLoaded', $scope.sourceData);

        $scope.$broadcast('analysisDataLoaded', analysisData.datatableConfig.datasources.tabledata.datum);
      });

    // function parseCsvData(csvData) {
    //   Papa.parse(csvData, {
    //     complete: function(results) {
    //       // console.log(results.data);
    //       // $scope.sourceData = results.data;
    //     }
    //   });
    // }

    $scope.$on('$stateChangeSuccess', function() {
      // console.log('stateChangeSuccess');
      console.log(analysisData);
      // console.log(analysisData.datatableConfig.datasources.tabledata.datum);
      // $rootScope.$broadcast('analysisDataLoaded', analysisData);
      // $rootScope.$broadcast('analysisDataLoaded', analysisData.datatableConfig.datasources.tabledata.datum);
    });

    // PubSub between Graph and Map.
    $scope.$on('currentGraphTarget', function(event, args) {
      // console.log('you touched the graph at record: ' + args);
      $rootScope.$broadcast('addMapTarget', args);
    });

    $scope.$on('clearGraphTarget', function(event, args) {
      // console.log('you stopped touching the graph record: ' + args[0]);
      $rootScope.$broadcast('removeMapTarget', args);
    });

    // PubSub between Datatable and Graph.
    $scope.$on('currentDatatableTarget', function(event, args) {
      // console.log('you touched the datatable at row: ' + args[0]);
      $rootScope.$broadcast('newDatatableTarget', args[0]);
    });

    $scope.$on('clearDatatableTarget', function(event, args) {
      // console.log('you stopped touching the datatable row: ' + args[0]);
      $rootScope.$broadcast('removeDatatableTarget', args[0]);
    });
  }

})();
