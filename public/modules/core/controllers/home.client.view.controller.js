'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.defaultTemplate = {
            'path':'modules/core/views/default.client.view.html'
        };

        $scope.userTemplate = {
            'path':'modules/core/views/user.client.view.html'
        };
	}
]);