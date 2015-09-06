'use strict';

angular.module('core').controller('GoalsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.third.client.view.html';

    }
]);