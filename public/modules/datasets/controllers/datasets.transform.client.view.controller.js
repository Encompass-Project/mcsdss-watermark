'use strict';

angular.module('core').controller('DatasetsTransformViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.transform.client.view.html';
        console.log($scope.whoami);

    }
]);