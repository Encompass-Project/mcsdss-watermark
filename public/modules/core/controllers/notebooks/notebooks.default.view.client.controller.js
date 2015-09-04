'use strict';

angular.module('core').controller('NotebooksDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.notebooks.default.view.html';

    }
]);