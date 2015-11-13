(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestFactory', TestFactory);

  TestFactory.$inject = ['$http'];

  function TestFactory($http) {
    var helloFactory = 'helloFactory';

    return {
      helloFactory
    };
  }

})();