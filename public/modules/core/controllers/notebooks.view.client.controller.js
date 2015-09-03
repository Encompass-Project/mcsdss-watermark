'use strict';

angular.module('core').controller('NotebooksViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.notebooks.view.html';
    }
]);