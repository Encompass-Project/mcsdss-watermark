(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .service('multipartForm', multipartForm);

  multipartForm.$inject = ['$scope', '$http']; // Added $scope dependency

  function multipartForm($scope, $http) {
    $scope.post = function(uploadUrl, data) {  // replaced this.post with $scope.post
      var fd = new FormData();

      for (var key in data) {
        fd.append(key, data[key]);
      }

      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity, // prevent serialization of data.
        headers: {
          'Content-Type': undefined       // let browser handle data typing.
        }
      });
    };
  }
})();