(function() {
  'use strict';

  angular
    .module('core')
    .controller('AnonViewController', AnonViewController);

  AnonViewController.$inject = ['$scope', 'Authentication'];

  function AnonViewController($scope, Authentication) {
      // This provides Authentication context.
      $scope.authentication = Authentication;
      $scope.whoami = 'default.client.view.html';
      $scope.currentRoute = 'Welcome';

      console.log($scope.currentRoute);
  }
})();