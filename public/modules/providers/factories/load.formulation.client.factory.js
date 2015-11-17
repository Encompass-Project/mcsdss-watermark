(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationDataRetrieval', FormulationDataRetrieval);

  FormulationDataRetrieval.$inject = ['$http', '$q', 'httpq'];

  function FormulationDataRetrieval($http, $q, httpq) {

    // var FormulationDataRetrieval = {};

    // create the container object for our formulation data.
    FormulationDataRetrieval.formulationDataContainer = {};
    FormulationDataRetrieval.formulationDataContainer.table = {};
    FormulationDataRetrieval.formulationDataContainer.graph = {};
    FormulationDataRetrieval.formulationDataContainer.map = {};
    FormulationDataRetrieval.formulationDataContainer.table.config = {};
    FormulationDataRetrieval.formulationDataContainer.graph.config = {};
    FormulationDataRetrieval.formulationDataContainer.map.config = {};

    // FormulationDataRetrieval.formulationDataTarget = '../../data/formulations/bs.formulation.js';

    // populate the configuration properties with the appropriate data from the formulationObject.

    FormulationDataRetrieval.getFormulationData = function (target) {
      // console.log('Loading formulation data for target: ', target);
      // return 'FORMULATION DATA';
      // return target;
      // return $http.get(target);        // returns the http get method itself.
      // var data = $http.get(target);
      // return data;                     // returns the http get method itself.

      var promise = $http
        .get(target)
        .then(function (response) {       // $http returns a promise, which has a then function, which also returns a promise
          // console.log(response.data);     // The then function here is an opportunity to modify the response
          return response.data;           // The return value gets picked up by the then in the controller.
        });

      return promise;  // Return the promise to the controller
    };

    FormulationDataRetrieval.parseFormulationData = function (d) {
      console.log(d);
      console.log('Parsing formulation data...');
      Papa.parse(d, {
        complete: function(results) {
          return results.data;
        }
      });
    };

    FormulationDataRetrieval.configureFormulationAnalysisData = function (d) {
      console.log(d);
    };

    return FormulationDataRetrieval;
  }

})();