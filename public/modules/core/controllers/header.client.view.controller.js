(function() {
	'use strict';

	angular
		.module('core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'Authentication', 'Menus'];

	function HeaderController($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		// Need to consolidate all app info into a config object that is shared across modules.
		$scope.appTitle = 'Conflux';
		$scope.versionNumber = 'Alpha v0.23.314';
		$scope.iconpath = '/modules/core/img/brand/conflux-logo-v1-icon-white-nods.png';
		$scope.currentRoute = 'Navigation';  // Need to make dynamic from loaded controller.
		$scope.toggleCollapsibleMenu = toggleCollapsibleMenu;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		function toggleCollapsibleMenu() {
			$scope.isCollapsed = !$scope.isCollapsed;
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

	}
})();