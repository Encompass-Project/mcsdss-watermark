(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('DashboardViewController', DashboardViewController);

  DashboardViewController.$inject = ['$scope', 'Authentication'];

  function DashboardViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Dashboard';
    $scope.listDisplayLimit = 7;
    $scope.clicked = clicked;

    console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();