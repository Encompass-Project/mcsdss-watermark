'use strict';

angular.module('core').controller('DashboardDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.default.client.view.html';

        $scope.dashboardTemplate = {
            'path':'modules/core/views/dashboard/dashboard.default.client.view.html'
        };
    }
]);