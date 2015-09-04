'use strict';

angular.module('core').controller('DatasetsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.datasets.default.view.html';

    }
]);