'use strict';

angular.module('core').controller('ModelsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.fifth.client.view.html';

    }
]);