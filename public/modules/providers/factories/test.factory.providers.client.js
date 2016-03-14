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
      helloFactory: helloFactory,
      goodbyeFactory: goodbyeFactory
    };
  }

  function testDeferredAngularSync() {
    var deferred = $q.defer();

    deferred.promise.then(function(result) {
      console.log('promise success');
    }, function(error) {
      console.log('promise error');
    });

    console.log('resolving deferred');
    deferred.resolve();
  }

})();