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
      // $scope.currentRoute = 'Anonymous';
      // $scope.logopath = '/modules/core/img/brand/conflux-logo-2-nobg-nocircle.png';
      $scope.logopath = '/modules/core/img/brand/conflux-logo-idea-v1-md-white.png';

      // console.log($scope.logopath);
      console.log($scope.currentRoute);
  }
})();