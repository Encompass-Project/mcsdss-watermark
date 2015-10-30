(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('httpq', httpqFactory);

  httpqFactory.$inject = ['$http', '$q'];

  function httpqFactory($http, $q) {
    return {
      get: function() {
        var deferred = $q.defer();
        $http.get.apply(null, arguments)
          .success(deferred.resolve)
          .error(deferred.resolve);
        return deferred.promise;
      }
    };
  }
})();