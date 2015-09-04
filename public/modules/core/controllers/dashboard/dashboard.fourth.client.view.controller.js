'use strict';

angular.module('core').controller('DashboardFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.fourth.client.view.html';

    }
]);