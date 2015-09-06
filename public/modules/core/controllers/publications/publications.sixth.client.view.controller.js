'use strict';

angular.module('core').controller('PublicationsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.sixth.client.view.html';

    }
]);