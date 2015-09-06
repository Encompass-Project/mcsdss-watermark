'use strict';

angular.module('core').controller('PublicationsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.fifth.client.view.html';

    }
]);