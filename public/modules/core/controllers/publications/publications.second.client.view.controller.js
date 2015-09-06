'use strict';

angular.module('core').controller('PublicationsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.second.client.view.html';

    }
]);