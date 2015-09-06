'use strict';

angular.module('core').controller('PublicationsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.third.client.view.html';

    }
]);