(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http', '$q', 'httpq'];

  function FormulationRetrieval($http, $q, httpq) {

    // create the container object for our formulation data.
    FormulationRetrieval.formulationContainer = {};

    // load the formulation configuration object.
    FormulationRetrieval.getFormulation = function (target) {
      // console.log('Loading formulation data for target: ', target);
      var promise = $http                                                                                                   // $http returns a promise, which has a then function, which also returns a promise.
        .get(target)
        .then(function (response) {                                                                                         //  Modify the response here.
          // console.log('New formulation configuration data is: ', response.data);
          return FormulationRetrieval.configureFormulation(response.data);                                                  // The return value gets picked up by the then.
        });
      return promise;                                                                                                       // Return the promise.
    };

    // populate the configuration properties with the appropriate data from the formulationObject.
    FormulationRetrieval.configureFormulation = function (f) {
      // console.log('loading this formulation: ', f);
      FormulationRetrieval.formulationContainer = f;
      FormulationRetrieval.loadFormulationSourceData(FormulationRetrieval.formulationContainer);
      FormulationRetrieval.loadFormulationGisData(FormulationRetrieval.formulationContainer);
      return FormulationRetrieval.formulationContainer;
    };

    // load source data into formulationConfig object.
    FormulationRetrieval.loadFormulationSourceData = function (fc) {
      // console.log('loading formulation source data from this configuration: ', fc);
      var datasources = [fc.datatableConfig.datasources.tabledata, fc.graphConfig.datasources.graphContextData];
      angular.forEach(datasources, loadData);

      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            FormulationRetrieval.parseFormulationDatasource(response.data, target);
          });
        return promise;
      }
    };

    FormulationRetrieval.parseFormulationDatasource = function (fd, destination) {
      // console.log('Parsing formulation datasource data and appending to destination: ', destination, fd);
      Papa.parse(fd, {
        complete: function(results) {
          // console.log('Parsed formulation datasource data strx: ', results.data);
          destination.datum = results.data;                                                             // Assign sourcedata to property on formulationContainer object.
        }
      });
    };

    // load source data into formulationConfig object.
    FormulationRetrieval.loadFormulationGisData = function (fc) {
      // console.log('loading formulation source data from this configuration: ', fc);
      var datasources = [fc.mapConfig.datasources.geojson];
      angular.forEach(datasources, loadGeodata);

      function loadGeodata(target) {
        // console.log(target);
        angular.forEach(target, function(value, key) {
          var promise = $http
            .get(value.source)
            .then(function (response) {
              value.datum = response.data;
            });
          return promise;
        });
      }

    };

    return FormulationRetrieval;
  }
})();