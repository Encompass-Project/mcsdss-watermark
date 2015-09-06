'use strict';

angular.module('core').controller('ModelsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.second.client.view.html';

    }
]);