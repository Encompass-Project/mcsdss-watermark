'use strict';

angular.module('core').controller('NotebooksViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.client.view.html';

        $scope.notebooksTemplate = {
            // 'path':'modules/core/views/notebooks/notebooks.default.client.view.html'
            'path':'modules/notebooks/views/list-notebooks.client.view.html'
        };
    }
]);