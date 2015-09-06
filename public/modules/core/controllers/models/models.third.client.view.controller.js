'use strict';

angular.module('core').controller('ModelsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.third.client.view.html';

    }
]);