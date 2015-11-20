(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http'];

  function FormulationRetrieval($http) {

    FormulationRetrieval.getFormulation = function (target) {
      var promise = $http
        .get(target)
        .then(function (response) {
          return FormulationRetrieval.configureFormulation(response.data);
        });
      return promise;
    };

    FormulationRetrieval.configureFormulation = function (f) {
      FormulationRetrieval.formulationContainer = f;
      FormulationRetrieval.loadFormulationSourceData(FormulationRetrieval.formulationContainer);
      FormulationRetrieval.loadFormulationGisData(FormulationRetrieval.formulationContainer);
      return FormulationRetrieval.formulationContainer;
    };

    FormulationRetrieval.loadFormulationSourceData = function (fc) {
      function parseFormulationDatasource(fd, destination) {
        Papa.parse(fd, {
          complete: function(results) {
            destination.datum = results.data;
          }
        });
      }

      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            parseFormulationDatasource(response.data, target);
          });
        return promise;
      }

      var datasources = [fc.datagridConfig.datasources.tabledata, fc.graphConfig.datasources.graphContextData];
      angular.forEach(datasources, loadData);
    };

    FormulationRetrieval.loadFormulationGisData = function (fc) {
      function loadGeodata(target) {
        angular.forEach(target, function(value, key) {
          var promise = $http
            .get(value.source)
            .then(function (response) {
              value.datum = response.data;
            });
          return promise;
        });
      }

      var datasources = [fc.mapConfig.datasources.geojson];
      angular.forEach(datasources, loadGeodata);
    };

    FormulationRetrieval.getAnalysisConfig = function (fc) {
      var analysisConfig = fc.analysisConfig.$promise;
      return analysisConfig;
    };

    FormulationRetrieval.getMaufConfig = function (fc) {
      var maufConfig = fc.maufConfig.$promise;
      return maufConfig;
    };

    FormulationRetrieval.getGraphConfig = function (fc) {
      var graphConfig = fc.graphConfig.$promise;
      return graphConfig;
    };

    FormulationRetrieval.getTableConfig = function (fc) {
      var tableConfig = fc.datagridConfig.$promise;
      return tableConfig;
    };

    FormulationRetrieval.getMapConfig = function (fc) {
      var mapConfig = fc.mapConfig.$promise;
      return mapConfig;
    };

    return FormulationRetrieval;
  }
})();