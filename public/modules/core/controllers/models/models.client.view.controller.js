'use strict';

angular.module('core').controller('ModelsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.client.view.html';

        $scope.modelsTemplate = {
            // 'path':'modules/core/views/models/models.default.client.view.html'
            'path':'modules/models/views/list-models.client.view.html'
        };
    }
]);