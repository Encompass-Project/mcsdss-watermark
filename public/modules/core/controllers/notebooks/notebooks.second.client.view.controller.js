'use strict';

angular.module('core').controller('NotebooksSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.second.client.view.html';

    }
]);