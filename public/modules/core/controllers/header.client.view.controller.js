(function() {
	'use strict';

	angular
		.module('core')
		.run(StateConfig)
		.controller('HeaderController', HeaderController);

	StateConfig.$inject = ['$rootScope', '$state', '$stateParams'];

	function StateConfig($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	}

	HeaderController.$inject = ['$rootScope', '$scope', 'Authentication', 'Menus'];

	function HeaderController($rootScope, $scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Navigation';
		$scope.toggleCollapsibleMenu = toggleCollapsibleMenu;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		// console.log($scope.currentRoute);

		// Need to consolidate all app info into a config object that is shared across modules.
		$scope.appTitle = 'Conflux';
		$scope.versionNumber = 'Alpha v0.23.314';
		$scope.iconpath = '/modules/core/img/brand/conflux-logo-v1-icon-white-nods.png';

		function toggleCollapsibleMenu() {
			$scope.isCollapsed = !$scope.isCollapsed;
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event) {
			// console.log('state changed', event);
			$scope.isCollapsed = false;
		});

	}
})();