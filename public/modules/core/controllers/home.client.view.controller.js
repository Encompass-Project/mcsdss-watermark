(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeViewController', HomeViewController);

  HomeViewController.$inject = ['$scope', 'Authentication', '$state'];

  function HomeViewController($scope, Authentication, $state) {
  // This provides Authentication context.
  $scope.authentication = Authentication;

    if ($scope.authentication.user === '') {
        // console.log('NO AUTH!');
        $state.go('anon');
    } else {
        // console.log('WELCOME');
        $state.go('dashboard.main');
    }
  }
})();