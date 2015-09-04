'use strict';

angular.module('core').controller('PublicationsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.default.client.view.html';

    }
]);