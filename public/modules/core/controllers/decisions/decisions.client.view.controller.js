'use strict';

angular.module('core').controller('DecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.client.view.html';

        $scope.decisionsTemplate = {
            // 'path':'modules/core/views/decisions/decisions.default.client.view.html'
            'path':'modules/decisions/views/list-decisions.client.view.html'
        };
    }
]);