(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('AnalysisDataFactory', AnalysisDataFactory);

  AnalysisDataFactory.$inject = ['$q', '$http', '$log', '$resource'];

  function AnalysisDataFactory($q, $http, $log, $resource) {
    // APPROACH 1.
    // Requires managing deferred object and custom promise.
    // return {
    //   getData: function(target) {
    //     var _deferred = $q.defer(); // make the promise.
    //     $http.get(target)
    //       .success(function(data) {
    //         _deferred.resolve({
    //           attribute1: data.attribute1,
    //           attribute2: data.attribute2
    //         });
    //       })
    //       .error(function(msg, code) {
    //         _deferred.reject(msg);
    //         $log.error(msg, code);
    //       });
    //     return _deferred.promise;
    //   }
    // };

    // APPROACH 2 TEST.
    return $resource('https://api.github.com/repos/:username/:repo/issues', {
      state: 'open'
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
})();