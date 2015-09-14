'use strict';

angular.module('core').controller('DatasetsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.client.view.html';

        $scope.datasetsTemplate = {
            // 'path':'modules/core/views/datasets/datasets.list.client.view.html'
            'path':'modules/datasets/views/list-datasets.client.view.html'
        };
    }
]);