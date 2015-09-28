'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // console.log($scope.authentication);
        // console.log($scope.authentication.user);
        // console.log($scope.authentication.user._id);

        // $scope.whoami = 'dashboard.client.view.html';
    }
]);