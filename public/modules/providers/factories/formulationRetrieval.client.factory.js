(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrievalService',FormulationRetrievalService);

  FormulationRetrievalService.$inject = ['$http'];

  function FormulationRetrievalService($http) {

    // START EXAMPLE //
    var formulationUsername;
    var formulationId;
    var getFormulation = function(path) {
      console.log('executing getFormulation(path) with event value of: ', path);
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + formulationUsername + '/' + path + '?callback=JSON_CALLBACK'
      });
    };
    return {
      formulationData: function() {
        console.log('passing formulationData to getFormulation().');
        return getFormulation('formulationData');
      },
      setUsername: function(newUsername) {
        console.log('setting formulationUsername to: ', newUsername);
        formulationUsername = newUsername;
      }
    };
    // END EXAMPLE //

    // START IMPLEMENTATION //

    // END IMPLEMENTATION //
  }

})();