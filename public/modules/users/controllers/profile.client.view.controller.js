'use strict';

angular.module('core').controller('ProfileViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.currentRoute = 'Profile';
        // console.log($scope.currentRoute);

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);