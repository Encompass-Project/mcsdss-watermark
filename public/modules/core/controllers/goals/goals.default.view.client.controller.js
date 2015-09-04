'use strict';

angular.module('core').controller('GoalsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.goals.default.view.html';

    }
]);