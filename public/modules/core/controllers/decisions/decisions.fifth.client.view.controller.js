'use strict';

angular.module('core').controller('DecisionsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.fifth.client.view.html';

    }
]);