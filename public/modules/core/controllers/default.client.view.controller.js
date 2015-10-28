(function() {
  'use strict';

  angular
    .module('core')
    .controller('DefaultViewController', DefaultViewController);

  DefaultViewController.$inject = ['$scope', 'Authentication'];

  function DefaultViewController($scope, Authentication) {
      // This provides Authentication context.
      $scope.authentication = Authentication;
      $scope.whoami = 'default.client.view.html';
  }
})();