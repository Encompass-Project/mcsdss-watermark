'use strict';

angular.module('core').controller('DatasetsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.datasets.view.html';

        $scope.datasetsTemplate = {
            'path':'modules/core/views/datasets/client.datasets.default.view.html'
        };
    }
]);