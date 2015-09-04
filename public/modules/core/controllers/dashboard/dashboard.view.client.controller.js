'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.dashboard.view.html';

        $scope.dashboardTemplate = {
            'path':'modules/core/views/dashboard/client.dashboard.default.view.html'
        };
    }
]);