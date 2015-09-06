'use strict';

angular.module('core').controller('ModelsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.fourth.client.view.html';

    }
]);