'use strict';

angular.module('core').controller('NotebooksThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.third.client.view.html';

    }
]);