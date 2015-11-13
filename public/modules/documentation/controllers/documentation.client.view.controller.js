(function() {
  'use strict';

  angular
    .module('documentation')
    .controller('DocumentationViewController', DocumentationViewController);

  DocumentationViewController.$inject = ['$scope', 'Authentication'];

  function DocumentationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Documentation';
    $scope.clicked = clicked;

    console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();