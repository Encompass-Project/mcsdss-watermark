'use strict';

angular.module('core').controller('NotebooksFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.fourth.client.view.html';

    }
]);