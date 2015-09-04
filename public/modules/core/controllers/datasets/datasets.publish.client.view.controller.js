'use strict';

angular.module('core').controller('DatasetsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.publish.client.view.html';

    }
]);