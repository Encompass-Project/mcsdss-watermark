'use strict';

angular.module('core').controller('NotebooksSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.sixth.client.view.html';

    }
]);