'use strict';

angular.module('core').controller('PublicationsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.publish.client.view';

    }
]);