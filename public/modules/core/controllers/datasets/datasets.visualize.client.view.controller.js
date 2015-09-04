'use strict';

angular.module('core').controller('DatasetsVisualizeViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.visualize.client.view.html';

    }
]);