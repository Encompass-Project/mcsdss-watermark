'use strict';

angular.module('core').controller('DecisionsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.sixth.client.view.html';

    }
]);