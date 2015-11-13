(function() {
  'use strict';

  angular
    .module('core')
    .controller('DatasetsViewController', DatasetsViewController);

  DatasetsViewController.$inject = ['$scope', 'Authentication'];

  function DatasetsViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.clicked = clicked;

    function clicked(target) {
        console.log(target);
    }
  }
})();