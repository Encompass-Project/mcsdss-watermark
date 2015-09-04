'use strict';

angular.module('core').controller('PublicationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.client.view.html';

        $scope.publicationsTemplate = {
            'path':'modules/core/views/publications/publications.default.client.view.html'
        };
    }
]);