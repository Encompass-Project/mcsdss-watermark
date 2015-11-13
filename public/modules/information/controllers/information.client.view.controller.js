(function() {
  'use strict';

  angular
    .module('information')
    .controller('InformationViewController', InformationViewController);

  InformationViewController.$inject = ['$scope', 'Authentication'];

  function InformationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Information';
    $scope.clicked = clicked;

    console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();