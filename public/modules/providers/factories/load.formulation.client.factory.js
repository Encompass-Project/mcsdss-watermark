(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationDataRetrieval', FormulationDataRetrieval);

  FormulationDataRetrieval.$inject = ['$http', '$q', 'httpq'];

  function FormulationDataRetrieval($http, $q, httpq) {

    // create the container object for our formulation data.
    var formulationDataContainer = {};
    formulationDataContainer.table = {};
    formulationDataContainer.graph = {};
    formulationDataContainer.map = {};
    formulationDataContainer.table.config = {};
    formulationDataContainer.graph.config = {};
    formulationDataContainer.map.config = {};

    // populate the configuration properties with the appropriate data from the formulationObject.

    function getFormulationData(id) {
      console.log('Loading formulation data for id: ', id);
      return 'Formulation data Loaded';
    }

    function parseFormulationData() {
      console.log('Parsing formulation data...');
      return 'Parsed formulation data ready';
    }

    return {
      sayHello: function() {
        return 'FormulationDataRetrieval says Hello';
      },
      formulationData: function() {
        return formulationDataContainer;
      }
    };
  }

})();