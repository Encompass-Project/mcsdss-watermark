'use strict';

angular.module('core').controller('ModelsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.sixth.client.view.html';

    }
]);