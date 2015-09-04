'use strict';

angular.module('core').controller('DashboardThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.third.client.view.html';

    }
]);