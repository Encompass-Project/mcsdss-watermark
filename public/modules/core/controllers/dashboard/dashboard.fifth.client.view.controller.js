'use strict';

angular.module('core').controller('DashboardFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.fifth.client.view.html';

    }
]);