(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestFactory', TestFactory);

  TestFactory.$inject = ['$http'];

  function TestFactory($http) {
    var helloFactory = 'hello Factory!';
    var goodbyeFactory = 'goodbye Factory!';

    return {
      helloFactory,
      goodbyeFactory
    };
  }

})();