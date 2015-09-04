'use strict';

angular.module('core').controller('DecisionsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.default.client.view.html';

    }
]);