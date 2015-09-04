'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.client.view.html';

        $scope.dashboardTemplate = {
            'path':'modules/core/views/dashboard/dashboard.default.client.view.html'
        };
    }
]);