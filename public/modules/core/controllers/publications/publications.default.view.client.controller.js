'use strict';

angular.module('core').controller('PublicationsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.publications.default.view.html';

    }
]);