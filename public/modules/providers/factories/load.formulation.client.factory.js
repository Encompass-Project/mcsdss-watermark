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
        // console.log('formulationPromise current value: ', promise);
        return promise;
      }

      return deferred.promise;
    };

    // Populate various config objects.
    FormulationRetrieval.getAnalysisConfig = function (fc) {
      // console.log('getAnalysis data resolved to: ', fc.analysisConfig);
      return FormulationRetrieval.setConfigurationData(fc.analysisConfig, analysisConfig);
    };

    FormulationRetrieval.getMaufConfig = function (fc) {
      // console.log('getMaufConfig data resolved to: ', fc.maufConfig);
      return FormulationRetrieval.setConfigurationData(fc.maufConfig, maufConfig);
    };

    FormulationRetrieval.getGraphConfig = function (fc) {
      // console.log('getGraphConfig data resolved to: ', fc.graphConfig);
      return FormulationRetrieval.setConfigurationData(fc.graphConfig, graphConfig);
    };

    FormulationRetrieval.getDatagridConfig = function (fc) {
      // console.log('getDatagridConfig data resolved to: ', fc.datagridConfig);
      return FormulationRetrieval.setConfigurationData(fc.datagridConfig, datagridConfig);
    };

    FormulationRetrieval.getMapConfig = function (fc) {
      // console.log('getMapConfig data resolved to: ', fc.mapConfig);
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
            // console.log('Finished parsing the data. New data looks like: ');
            // console.log(results.data);
            // console.log('-------------------------------------------------');
            destination.datum = results.data;
          }
        });
      }

      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            // console.log('Finished loading data for file: ' + target.source + '. Now parsing the following data: ');
            // console.log(response.data);
            // console.log('-------------------------------------------------');
            parseFormulationDatasource(response.data, target);
            // return parseFormulationDatasource(response.data, target); // Adding return.
          });
        return promise;
      }

      var datasources = [fc.datagridConfig.datasources.tabledata, fc.graphConfig.datasources.graphdata, fc.graphConfig.datasources.graphContextData];
      angular.forEach(datasources, loadData);
    };

    FormulationRetrieval.loadFormulationGisData = function (fc) {
      function loadGeodata(target) {
        angular.forEach(target, function(value, key) {
          var promise = $http
            .get(value.source)
            .then(function (response) {
              value.datum = response.data;
              // return value.datum;
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