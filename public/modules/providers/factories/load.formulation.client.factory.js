(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('LoadFormulation', LoadFormulation);

  LoadFormulation.$inject = ['$http'];

  function LoadFormulation($http) {

    return {
      formulationData: function() {
        return 'KITTENS!';
      },
      sayHello: function() {
        return 'LoadFormulation says Hello';
      }
    };
  }

})();