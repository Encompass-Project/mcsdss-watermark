'use strict';

angular.module('core').controller('DefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'default.client.view.html';
    }
]);