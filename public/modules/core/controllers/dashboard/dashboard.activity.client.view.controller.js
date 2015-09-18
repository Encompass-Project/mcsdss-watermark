'use strict';

angular.module('core').controller('DashboardActivityViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.sixth.client.view.html';

    }
]);