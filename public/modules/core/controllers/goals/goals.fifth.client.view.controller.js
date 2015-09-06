'use strict';

angular.module('core').controller('GoalsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.fifth.client.view.html';

    }
]);