(function() {
  'use strict';

  angular
    .module('core')
    .controller('UserViewController', UserViewController);

  UserViewController.$injetc = ['$scope', 'Authentication'];

  function UserViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Authenticated';
    $scope.clicked = clicked;

    console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();