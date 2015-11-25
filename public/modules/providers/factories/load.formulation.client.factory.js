(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http', '$q'];

  function FormulationRetrieval($http, $q) {

    var currentFormulation = null;
    var analysisConfig = null;
    var maufConfig = null;
    var datagridConfig = null;
    var graphConfig = null;
    var mapConfig = null;

    // Primary access point for service data.
    FormulationRetrieval.getFormulation = function (target) {
      var deferred = $q.defer();
      if(currentFormulation !== null) {
        deferred.resolve(currentFormulation);  // Cache
      }
      else {
        var promise = $http
          .get(target)
          .then(function (response) {
            console.log('formulation data resolved to: ', response.data);
            currentFormulation = FormulationRetrieval.configureFormulation(response.data);
            return currentFormulation;
          });
        return promise;
      }

      return deferred.promise;
    };

    // Populate various config objects.
    FormulationRetrieval.getAnalysisConfig = function (fc) {
      console.log('getAnalysis data resolved to: ', fc.analysisConfig);
      return FormulationRetrieval.setConfigurationData(fc.analysisConfig, analysisConfig);
    };

    FormulationRetrieval.getMaufConfig = function (fc) {
      console.log('getAnalysis data resolved to: ', fc.maufConfig);
      return FormulationRetrieval.setConfigurationData(fc.maufConfig, maufConfig);
    };

    FormulationRetrieval.getGraphConfig = function (fc) {
      console.log('getAnalysis data resolved to: ', fc.graphConfig);
      return FormulationRetrieval.setConfigurationData(fc.graphConfig, graphConfig);
    };

    FormulationRetrieval.getDatagridConfig = function (fc) {
      console.log('getAnalysis data resolved to: ', fc.datagridConfig);
      return FormulationRetrieval.setConfigurationData(fc.datagridConfig, datagridConfig);
    };

    FormulationRetrieval.getMapConfig = function (fc) {
      console.log('getAnalysis data resolved to: ', fc.mapConfig);
      return FormulationRetrieval.setConfigurationData(fc.mapConfig, mapConfig);
    };

    // Helper methods.
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
            // console.log(results.data);
            destination.datum = results.data;
          }
        });
      }

      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            // console.log(response.data);
            parseFormulationDatasource(response.data, target);
          });
        return promise;
      }

      var datasources = [fc.datagridConfig.datasources.tabledata, fc.graphConfig.datasources.graphContextData, fc.graphConfig.datasources.graphdata];
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

    FormulationRetrieval.setConfigurationData = function (source, targetConfig) {
      var deferred = $q.defer();
      if(targetConfig !== null) {
        deferred.resolve(targetConfig);  // from Cache
      }
      else {
        targetConfig = source;   // from Server
        return targetConfig;
      }
      return deferred.promise;
    };

    return FormulationRetrieval;
  }
})();