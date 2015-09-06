'use strict';

angular.module('core').controller('DecisionsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.third.client.view.html';

    }
]);