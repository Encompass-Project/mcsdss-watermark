'use strict';

angular.module('core').controller('AnalyzeAbstractViewController', ['$scope', '$state', '$location', 'Authentication',
    function($scope, $state, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };

        $state.go('dashboard.analyze-abstract.layout');     // Required to get nested named views to populate correctly. Not routing correctly from routes.js without this.
    }
]);
