'use strict';

angular.module('core').controller('NotebooksViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {

        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);