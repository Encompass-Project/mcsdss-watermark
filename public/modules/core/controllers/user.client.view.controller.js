(function() {
  'use strict';

  angular
    .module('core')
    .controller('UserViewController', UserViewController);

  UserViewController.$injetc = ['$scope', 'Authentication'];

  function UserViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.clicked = clicked;

    function clicked(target) {
        // console.log(target);
    }
  }
})();