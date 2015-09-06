'use strict';

angular.module('core').controller('DashboardDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.default.client.view.html';

        $scope.recentActivity = {
            actions: [
                'Things are happening around here',
                'Things are happening all about',
                'Things are happening sometimes',
                'Things are happening I think',
                'Things are happening right?',
                'Things are happening somewhere',
                'Things are happening probably',
                'Things are happening presumably',
                'Things are happening to someone',
                'Things are happening someplace',
                'Things are happening someplace',
                'Things are happening someplace'
            ]
        };

        // $scope.recentActivity = recentActivity;

    }
]);