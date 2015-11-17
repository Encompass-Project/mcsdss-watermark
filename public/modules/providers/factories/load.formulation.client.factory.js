(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http', '$q', 'httpq'];

  function FormulationRetrieval($http, $q, httpq) {

    // var FormulationRetrieval = {};

    // create the container object for our formulation data.
    FormulationRetrieval.formulationDataContainer = {};
    FormulationRetrieval.formulationDataContainer.table = {};
    FormulationRetrieval.formulationDataContainer.graph = {};
    FormulationRetrieval.formulationDataContainer.map = {};
    FormulationRetrieval.formulationDataContainer.table.config = {};
    FormulationRetrieval.formulationDataContainer.graph.config = {};
    FormulationRetrieval.formulationDataContainer.map.config = {};

    // FormulationRetrieval.formulationDataTarget = '../../data/formulations/bs.formulation.js';

    // populate the configuration properties with the appropriate data from the formulationObject.

    FormulationRetrieval.getFormulationData = function (target) {
      // console.log('Loading formulation data for target: ', target);
      // return 'FORMULATION DATA';

      var promise = $http
        .get(target)
        .then(function (response) {       // $http returns a promise, which has a then function, which also returns a promise
          // console.log(response.data);     // The then function here is an opportunity to modify the response
          return response.data;           // The return value gets picked up by the then in the controller.
        });

      return promise;                     // Return the promise to the controller
    };

    FormulationRetrieval.parseFormulationData = function (d) {
      console.log(d);
      console.log('Parsing formulation data...');
      Papa.parse(d, {
        complete: function(results) {
          return results.data;
        }
      });
    };

    FormulationRetrieval.configureFormulationAnalysisData = function (d) {
      console.log(d);
    };

    return FormulationRetrieval;
  }

})();