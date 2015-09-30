'use strict';

angular.module('core').controller('CurateDecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.curate.client.view';

    }
]);
