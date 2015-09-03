'use strict';

angular.module('core').controller('GoalsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.goals.view.html';
    }
]);