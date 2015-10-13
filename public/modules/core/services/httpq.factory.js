var app = angular.module('mcsdss')
    .factory('httpq', ['$http', '$q',
        function ($http, $q) {
            return {
                get: function () {
                    var deferred = $q.defer();
                    $http.get.apply(null, arguments)
                        .success(deferred.resolve)
                        .error(deferred.resolve);
                    return deferred.promise;
                }
            }
        }
    ]);
