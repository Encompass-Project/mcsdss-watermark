(function() {
  'use strict';

  angular
    .module('information')
    .controller('AboutInformationViewController', AboutInformationViewController);

  AboutInformationViewController.$inject = ['$scope', 'Authentication'];

  function AboutInformationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.appTitle = 'Watermark';
    $scope.versionNumber = 'Alpha v0.23.314';
    // $scope.logopath = '/modules/core/img/brand/conflux-logo-idea-v1-md-white.png';
    $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c2_transparent.png';
    $scope.currentRoute = 'About';
    $scope.clicked = clicked;
    // console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();