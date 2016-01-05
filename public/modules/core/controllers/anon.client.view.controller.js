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
      // $scope.logopath = '/modules/core/img/brand/conflux-logo-idea-v1-md-white.png';
      $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c1_transparent.png';

      // console.log($scope.logopath);
      console.log($scope.currentRoute);
  }
})();