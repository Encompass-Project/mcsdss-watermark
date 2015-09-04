'use strict';

angular.module('core').controller('DecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.decisions.view.html';

        $scope.decisionsTemplate = {
            'path':'modules/core/views/decisions/client.decisions.default.view.html'
        };
    }
]);