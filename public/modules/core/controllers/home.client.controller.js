'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        // console.log($scope);

        $scope.displayName = $scope.authentication.user.displayName;
	}
]);