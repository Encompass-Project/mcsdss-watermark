'use strict';

angular.module('core').controller('GoalsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.fourth.client.view.html';

    }
]);