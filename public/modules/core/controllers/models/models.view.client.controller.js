'use strict';

angular.module('core').controller('ModelsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.models.view.html';

        $scope.modelsTemplate = {
            'path':'modules/core/views/models/client.models.default.view.html'
        };
    }
]);