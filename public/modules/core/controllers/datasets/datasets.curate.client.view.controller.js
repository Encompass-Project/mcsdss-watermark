'use strict';

angular.module('core').controller('DatasetsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.curate.client.view.html';

    }
]);