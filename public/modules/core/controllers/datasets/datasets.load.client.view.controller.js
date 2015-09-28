'use strict';

angular.module('core').controller('DatasetsLoadViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.load.client.view.html';
        console.log($scope.whoami);

    }
]);