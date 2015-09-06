'use strict';

angular.module('core').controller('GoalsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.sixth.client.view.html';

    }
]);