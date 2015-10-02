'use strict';

angular.module('core').controller('AnalyzeViewController', ['$scope', '$location', 'Authentication',
    function($scope, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
