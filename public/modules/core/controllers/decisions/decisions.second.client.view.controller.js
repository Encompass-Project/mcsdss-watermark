'use strict';

angular.module('core').controller('DecisionsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.second.client.view.html';

    }
]);