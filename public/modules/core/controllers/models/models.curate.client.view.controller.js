'use strict';

angular.module('core').controller('ModelsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.curate.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);