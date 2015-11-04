'use strict';

angular.module('core').controller('ModelsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.publish.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);