'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.dashboard.view.html';
    }
]);