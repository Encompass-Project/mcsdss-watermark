(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('LoadFormulationService', LoadFormulationService);

  LoadFormulationService.$inject = ['$http'];

  function LoadFormulationService($http) {

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
      },
      sayHello: function() {
        return 'Hello';
      }
    };
    // END EXAMPLE //

    // START IMPLEMENTATION //

    // END IMPLEMENTATION //
  }

})();