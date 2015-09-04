'use strict';

angular.module('core').controller('GoalsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.client.view.html';

        $scope.goalsTemplate = {
            'path':'modules/core/views/goals/goals.default.client.view.html'
        };
    }
]);