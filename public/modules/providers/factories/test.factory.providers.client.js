(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestFactory', TestFactory);

  TestFactory.$inject = ['$http'];

  function TestFactory($http) {
    var helloFactory = 'hello TestFactory!';
    var goodbyeFactory = 'goodbye TestFactory!';

    return {
      helloFactory,
      goodbyeFactory
    };
  }

})();