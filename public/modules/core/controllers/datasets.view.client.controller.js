'use strict';

angular.module('core').controller('DatasetsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.datasets.view.html';
    }
]);