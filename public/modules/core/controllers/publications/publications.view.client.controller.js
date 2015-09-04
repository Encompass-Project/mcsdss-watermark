'use strict';

angular.module('core').controller('PublicationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.publications.view.html';

        $scope.publicationsTemplate = {
            'path':'modules/core/views/publications/client.publications.default.view.html'
        };
    }
]);