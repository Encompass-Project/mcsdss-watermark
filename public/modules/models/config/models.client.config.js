'use strict';

// Configuring the Articles module
angular.module('models').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Models', 'models', 'dropdown', '/models(/create)?');
		Menus.addSubMenuItem('topbar', 'models', 'List Models', 'models');
		Menus.addSubMenuItem('topbar', 'models', 'New Model', 'models/create');
	}
]);