'use strict';

angular.module('core').controller('ModelsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.default.client.view.html';

    }
]);