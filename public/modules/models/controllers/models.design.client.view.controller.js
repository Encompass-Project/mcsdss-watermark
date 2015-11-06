'use strict';

angular.module('core').controller('ModelsDesignViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.design.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);