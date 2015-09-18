'use strict';

angular.module('core').controller('UserViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {

        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.displayName = $scope.authentication.user.displayName;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);