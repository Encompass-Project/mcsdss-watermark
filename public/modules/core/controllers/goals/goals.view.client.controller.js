'use strict';

angular.module('core').controller('GoalsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.goals.view.html';

        $scope.goalsTemplate = {
            'path':'modules/core/views/goals/client.goals.default.view.html'
        };
    }
]);