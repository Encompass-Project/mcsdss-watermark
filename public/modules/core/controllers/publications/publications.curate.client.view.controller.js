'use strict';

angular.module('core').controller('PublicationsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.curate.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);