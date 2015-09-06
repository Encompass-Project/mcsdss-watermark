'use strict';

angular.module('core').controller('DecisionsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.fourth.client.view.html';

    }
]);