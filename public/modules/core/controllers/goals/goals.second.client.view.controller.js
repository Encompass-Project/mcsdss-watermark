'use strict';

angular.module('core').controller('GoalsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.second.client.view.html';

    }
]);