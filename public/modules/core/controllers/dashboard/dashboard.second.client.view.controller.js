'use strict';

angular.module('core').controller('DashboardSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.second.client.view.html';

    }
]);