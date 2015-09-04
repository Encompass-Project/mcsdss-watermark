'use strict';

angular.module('core').controller('DatasetsListViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.list.client.view.html';

    }
]);