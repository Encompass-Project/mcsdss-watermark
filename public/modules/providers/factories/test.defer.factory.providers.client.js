(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestDeferFactory', TestDeferFactory);

  TestDeferFactory.$inject = ['$q'];

  function TestDeferFactory ($q) {

    TestDeferFactory.getTested = function () {
      var deferred = $q.defer();
      console.log('deferred object created.');

      deferred.promise.then(
        console.log('resolving deferred promise in then() block.'),
        function (result) {
          console.log('promise success!');
        }, function (error) {
          console.log('promise error!');
        }
      );

      console.log('resolving deferred object via resolve().');
      deferred.resolve();

      console.log('returning deffered promise resolve.');
    };

    return TestDeferFactory;
  }

})();