'use strict';

angular.module('core').controller('PublishDecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.publish.client.view';

    }
]);