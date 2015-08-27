'use strict';

// Configuring the Articles module
angular.module('decisions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Decisions', 'decisions', 'dropdown', '/decisions(/create)?');
		Menus.addSubMenuItem('topbar', 'decisions', 'List Decisions', 'decisions');
		Menus.addSubMenuItem('topbar', 'decisions', 'New Decision', 'decisions/create');
	}
]);