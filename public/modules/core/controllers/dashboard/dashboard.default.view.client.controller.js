'use strict';

angular.module('core').controller('DashboardDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.dashboard.default.view.html';

    }
]);