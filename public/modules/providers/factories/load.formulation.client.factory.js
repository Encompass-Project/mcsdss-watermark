(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http', '$q', 'httpq'];

  function FormulationRetrieval($http, $q, httpq) {

    FormulationRetrieval.formulationContainer = {};

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
      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            FormulationRetrieval.parseFormulationDatasource(response.data, target);
          });
        return promise;
      }

      var datasources = [fc.datatableConfig.datasources.tabledata, fc.graphConfig.datasources.graphContextData];
      angular.forEach(datasources, loadData);
    };

    FormulationRetrieval.parseFormulationDatasource = function (fd, destination) {
      Papa.parse(fd, {
        complete: function(results) {
          destination.datum = results.data;
        }
      });
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

    return FormulationRetrieval;
  }
})();