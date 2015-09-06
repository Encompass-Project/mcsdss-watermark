'use strict';

angular.module('core').controller('PublicationsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.fourth.client.view.html';

    }
]);