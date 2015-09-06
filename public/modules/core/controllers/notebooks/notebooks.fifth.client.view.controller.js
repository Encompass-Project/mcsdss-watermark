'use strict';

angular.module('core').controller('NotebooksFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.fifth.client.view.html';

    }
]);