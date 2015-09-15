'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mcsdss';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils']; // 'leaflet-directive'

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('datasets');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('decisions');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('goals');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('models');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('notebooks');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('publications');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.client.view.html';

        $scope.dashboardTemplate = {
            'path':'modules/core/views/dashboard/dashboard.default.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('DashboardDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.default.client.view.html';

        $scope.currentActivity = {
            actions: [
                'Things are happening around here',
                'Things are happening all about',
                'Things are happening sometimes',
                'Things are happening I think',
                'Things are happening right?',
                'Things are happening somewhere',
                'Things are happening probably',
                'Things are happening presumably',
                'Things are happening to someone',
                'Things are happening someplace',
                'Things are happening someplace',
                'Things are happening someplace'
            ]
        };

        $scope.currentDatasets = {
            datasets: [
                'Dataset 1',
                'Dataset 2',
                'Dataset 3'
            ]
        };

        $scope.currentModels = {
            models: [
                'Model 1',
                'Model 2',
                'Model 3'
            ]
        };

        $scope.currentGoals = {
            goals: [
                'Goal 1',
                'Goal 2',
                'Goal 3'
            ]
        };

        $scope.currentDecisions = {
            decisions: [
                'Decision 1',
                'Decision 2',
                'Decision 3'
            ]
        };

        $scope.currentNotebooks = {
            notebooks: [
                'Notebook 1',
                'Notebook 2',
                'Notebook 3'
            ]
        };

        $scope.currentPublications = {
            publications: [
                'Publication 1',
                'Publication 2',
                'Publication 3'
            ]
        };

    }
]);
'use strict';

angular.module('core').controller('DashboardFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DashboardFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DashboardSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DashboardSidebarController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.displayName = $scope.authentication.user.displayName;

        $scope.selectedTemplate = {
            'path':'modules/core/views/dashboard/dashboard.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('DashboardSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DashboardThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.third.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.client.view.html';

        $scope.datasetsTemplate = {
            // 'path':'modules/core/views/datasets/datasets.list.client.view.html'
            'path':'modules/datasets/views/list-datasets.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('DatasetsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.curate.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsListViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.list.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsLoadViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.load.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.publish.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsTransformViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.transform.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DatasetsVisualizeViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.visualize.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.client.view.html';

        $scope.decisionsTemplate = {
            // 'path':'modules/core/views/decisions/decisions.default.client.view.html'
            'path':'modules/decisions/views/list-decisions.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('DecisionsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.default.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DecisionsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'decisions.third.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('DefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'default.client.view.html';
    }
]);
'use strict';

angular.module('core').controller('GoalsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.client.view.html';

        $scope.goalsTemplate = {
            // 'path':'modules/core/views/goals/goals.default.client.view.html'
            'path':'modules/goals/views/list-goals.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('GoalsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.default.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('GoalsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('GoalsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('GoalsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('GoalsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('GoalsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'goals.third.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		// $scope.filter('customNavbarOrder', function() {
		// 	function navbarOrder(subitem) {
		// 		// tbd.
		// 	}
		// });
	}
]);
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
'use strict';

angular.module('core').controller('ModelsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.client.view.html';

        $scope.modelsTemplate = {
            // 'path':'modules/core/views/models/models.default.client.view.html'
            'path':'modules/models/views/list-models.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('ModelsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.default.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('ModelsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('ModelsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('ModelsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('ModelsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('ModelsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.third.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.client.view.html';

        $scope.notebooksTemplate = {
            // 'path':'modules/core/views/notebooks/notebooks.default.client.view.html'
            'path':'modules/notebooks/views/list-notebooks.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('NotebooksDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.default.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('NotebooksThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'notebooks.third.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.client.view.html';

        $scope.publicationsTemplate = {
            // 'path':'modules/core/views/publications/publications.default.client.view.html'
            'path':'modules/publications/views/list-publications.client.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('PublicationsDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.default.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsFifthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.fifth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsFourthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.fourth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsSecondViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.second.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsSixthViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.sixth.client.view.html';

    }
]);
'use strict';

angular.module('core').controller('PublicationsThirdViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.third.client.view.html';

    }
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

(function() {
	describe('HeaderController', function() {
		//Initialize global variables
		var scope,
			HeaderController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HeaderController = $controller('HeaderController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
'use strict';

(function() {
	describe('HomeController', function() {
		//Initialize global variables
		var scope,
			HomeController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HomeController = $controller('HomeController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
'use strict';

// Configuring the Articles module
// Uncomment to include in topbar navigation.
/*
angular.module('datasets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Datasets', 'datasets', 'dropdown', '/datasets(/create)?');
		Menus.addSubMenuItem('topbar', 'datasets', 'List Datasets', 'datasets');
		Menus.addSubMenuItem('topbar', 'datasets', 'New Dataset', 'datasets/create');
	}
]);
*/
'use strict';

//Setting up route
angular.module('datasets').config(['$stateProvider',
	function($stateProvider) {
		// Datasets state routing
		$stateProvider.
		state('listDatasets', {
			url: '/datasets',
			templateUrl: 'modules/datasets/views/list-datasets.client.view.html'
		}).
		state('createDataset', {
			url: '/datasets/create',
			templateUrl: 'modules/datasets/views/create-dataset.client.view.html'
		}).
		state('viewDataset', {
			url: '/datasets/:datasetId',
			templateUrl: 'modules/datasets/views/view-dataset.client.view.html'
		}).
		state('editDataset', {
			url: '/datasets/:datasetId/edit',
			templateUrl: 'modules/datasets/views/edit-dataset.client.view.html'
		});
	}
]);
'use strict';

// Datasets controller
angular.module('datasets').controller('DatasetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Datasets',
	function($scope, $stateParams, $location, Authentication, Datasets) {
		$scope.authentication = Authentication;

		// Create new Dataset
		$scope.create = function() {
			// Create new Dataset object
			var dataset = new Datasets ({
				name: this.name
			});

			// Redirect after save
			dataset.$save(function(response) {
				$location.path('datasets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dataset
		$scope.remove = function(dataset) {
			if ( dataset ) { 
				dataset.$remove();

				for (var i in $scope.datasets) {
					if ($scope.datasets [i] === dataset) {
						$scope.datasets.splice(i, 1);
					}
				}
			} else {
				$scope.dataset.$remove(function() {
					$location.path('datasets');
				});
			}
		};

		// Update existing Dataset
		$scope.update = function() {
			var dataset = $scope.dataset;

			dataset.$update(function() {
				$location.path('datasets/' + dataset._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Datasets
		$scope.find = function() {
			$scope.datasets = Datasets.query();
		};

		// Find existing Dataset
		$scope.findOne = function() {
			$scope.dataset = Datasets.get({ 
				datasetId: $stateParams.datasetId
			});
		};
	}
]);
'use strict';

//Datasets service used to communicate Datasets REST endpoints
angular.module('datasets').factory('Datasets', ['$resource',
	function($resource) {
		return $resource('datasets/:datasetId', { datasetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Datasets Controller Spec
	describe('Datasets Controller Tests', function() {
		// Initialize global variables
		var DatasetsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Datasets controller.
			DatasetsController = $controller('DatasetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Dataset object fetched from XHR', inject(function(Datasets) {
			// Create sample Dataset using the Datasets service
			var sampleDataset = new Datasets({
				name: 'New Dataset'
			});

			// Create a sample Datasets array that includes the new Dataset
			var sampleDatasets = [sampleDataset];

			// Set GET response
			$httpBackend.expectGET('datasets').respond(sampleDatasets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.datasets).toEqualData(sampleDatasets);
		}));

		it('$scope.findOne() should create an array with one Dataset object fetched from XHR using a datasetId URL parameter', inject(function(Datasets) {
			// Define a sample Dataset object
			var sampleDataset = new Datasets({
				name: 'New Dataset'
			});

			// Set the URL parameter
			$stateParams.datasetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/datasets\/([0-9a-fA-F]{24})$/).respond(sampleDataset);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dataset).toEqualData(sampleDataset);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Datasets) {
			// Create a sample Dataset object
			var sampleDatasetPostData = new Datasets({
				name: 'New Dataset'
			});

			// Create a sample Dataset response
			var sampleDatasetResponse = new Datasets({
				_id: '525cf20451979dea2c000001',
				name: 'New Dataset'
			});

			// Fixture mock form input values
			scope.name = 'New Dataset';

			// Set POST response
			$httpBackend.expectPOST('datasets', sampleDatasetPostData).respond(sampleDatasetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Dataset was created
			expect($location.path()).toBe('/datasets/' + sampleDatasetResponse._id);
		}));

		it('$scope.update() should update a valid Dataset', inject(function(Datasets) {
			// Define a sample Dataset put data
			var sampleDatasetPutData = new Datasets({
				_id: '525cf20451979dea2c000001',
				name: 'New Dataset'
			});

			// Mock Dataset in scope
			scope.dataset = sampleDatasetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/datasets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/datasets/' + sampleDatasetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid datasetId and remove the Dataset from the scope', inject(function(Datasets) {
			// Create new Dataset object
			var sampleDataset = new Datasets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Datasets array and include the Dataset
			scope.datasets = [sampleDataset];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/datasets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDataset);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.datasets.length).toBe(0);
		}));
	});
}());
'use strict';

// Configuring the Articles module
// Uncomment to include in topbar navigation.
/*
angular.module('decisions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Decisions', 'decisions', 'dropdown', '/decisions(/create)?');
		Menus.addSubMenuItem('topbar', 'decisions', 'List Decisions', 'decisions');
		Menus.addSubMenuItem('topbar', 'decisions', 'New Decision', 'decisions/create');
	}
]);
*/
'use strict';

//Setting up route
angular.module('decisions').config(['$stateProvider',
	function($stateProvider) {
		// Decisions state routing
		$stateProvider.
		state('listDecisions', {
			url: '/decisions',
			templateUrl: 'modules/decisions/views/list-decisions.client.view.html'
		}).
		state('createDecision', {
			url: '/decisions/create',
			templateUrl: 'modules/decisions/views/create-decision.client.view.html'
		}).
		state('viewDecision', {
			url: '/decisions/:decisionId',
			templateUrl: 'modules/decisions/views/view-decision.client.view.html'
		}).
		state('editDecision', {
			url: '/decisions/:decisionId/edit',
			templateUrl: 'modules/decisions/views/edit-decision.client.view.html'
		});
	}
]);
'use strict';

// Decisions controller
angular.module('decisions').controller('DecisionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Decisions',
	function($scope, $stateParams, $location, Authentication, Decisions) {
		$scope.authentication = Authentication;

		// Create new Decision
		$scope.create = function() {
			// Create new Decision object
			var decision = new Decisions ({
				name: this.name
			});

			// Redirect after save
			decision.$save(function(response) {
				$location.path('decisions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Decision
		$scope.remove = function(decision) {
			if ( decision ) { 
				decision.$remove();

				for (var i in $scope.decisions) {
					if ($scope.decisions [i] === decision) {
						$scope.decisions.splice(i, 1);
					}
				}
			} else {
				$scope.decision.$remove(function() {
					$location.path('decisions');
				});
			}
		};

		// Update existing Decision
		$scope.update = function() {
			var decision = $scope.decision;

			decision.$update(function() {
				$location.path('decisions/' + decision._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Decisions
		$scope.find = function() {
			$scope.decisions = Decisions.query();
		};

		// Find existing Decision
		$scope.findOne = function() {
			$scope.decision = Decisions.get({ 
				decisionId: $stateParams.decisionId
			});
		};
	}
]);
'use strict';

//Decisions service used to communicate Decisions REST endpoints
angular.module('decisions').factory('Decisions', ['$resource',
	function($resource) {
		return $resource('decisions/:decisionId', { decisionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Decisions Controller Spec
	describe('Decisions Controller Tests', function() {
		// Initialize global variables
		var DecisionsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Decisions controller.
			DecisionsController = $controller('DecisionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Decision object fetched from XHR', inject(function(Decisions) {
			// Create sample Decision using the Decisions service
			var sampleDecision = new Decisions({
				name: 'New Decision'
			});

			// Create a sample Decisions array that includes the new Decision
			var sampleDecisions = [sampleDecision];

			// Set GET response
			$httpBackend.expectGET('decisions').respond(sampleDecisions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.decisions).toEqualData(sampleDecisions);
		}));

		it('$scope.findOne() should create an array with one Decision object fetched from XHR using a decisionId URL parameter', inject(function(Decisions) {
			// Define a sample Decision object
			var sampleDecision = new Decisions({
				name: 'New Decision'
			});

			// Set the URL parameter
			$stateParams.decisionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/decisions\/([0-9a-fA-F]{24})$/).respond(sampleDecision);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.decision).toEqualData(sampleDecision);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Decisions) {
			// Create a sample Decision object
			var sampleDecisionPostData = new Decisions({
				name: 'New Decision'
			});

			// Create a sample Decision response
			var sampleDecisionResponse = new Decisions({
				_id: '525cf20451979dea2c000001',
				name: 'New Decision'
			});

			// Fixture mock form input values
			scope.name = 'New Decision';

			// Set POST response
			$httpBackend.expectPOST('decisions', sampleDecisionPostData).respond(sampleDecisionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Decision was created
			expect($location.path()).toBe('/decisions/' + sampleDecisionResponse._id);
		}));

		it('$scope.update() should update a valid Decision', inject(function(Decisions) {
			// Define a sample Decision put data
			var sampleDecisionPutData = new Decisions({
				_id: '525cf20451979dea2c000001',
				name: 'New Decision'
			});

			// Mock Decision in scope
			scope.decision = sampleDecisionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/decisions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/decisions/' + sampleDecisionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid decisionId and remove the Decision from the scope', inject(function(Decisions) {
			// Create new Decision object
			var sampleDecision = new Decisions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Decisions array and include the Decision
			scope.decisions = [sampleDecision];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/decisions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDecision);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.decisions.length).toBe(0);
		}));
	});
}());
'use strict';

// Configuring the Articles module
// Uncomment to include in topbar navigation.
/*
angular.module('goals').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Goals', 'goals', 'dropdown', '/goals(/create)?');
		Menus.addSubMenuItem('topbar', 'goals', 'List Goals', 'goals');
		Menus.addSubMenuItem('topbar', 'goals', 'New Goal', 'goals/create');
	}
]);
*/
'use strict';

//Setting up route
angular.module('goals').config(['$stateProvider',
	function($stateProvider) {
		// Goals state routing
		$stateProvider.
		state('listGoals', {
			url: '/goals',
			templateUrl: 'modules/goals/views/list-goals.client.view.html'
		}).
		state('createGoal', {
			url: '/goals/create',
			templateUrl: 'modules/goals/views/create-goal.client.view.html'
		}).
		state('viewGoal', {
			url: '/goals/:goalId',
			templateUrl: 'modules/goals/views/view-goal.client.view.html'
		}).
		state('editGoal', {
			url: '/goals/:goalId/edit',
			templateUrl: 'modules/goals/views/edit-goal.client.view.html'
		});
	}
]);
'use strict';

// Goals controller
angular.module('goals').controller('GoalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Goals',
	function($scope, $stateParams, $location, Authentication, Goals) {
		$scope.authentication = Authentication;
		$scope.textLimitListView = 140;

		// Create new Goal
		$scope.create = function() {
			// Create new Goal object
			var goal = new Goals ({
				name: this.name,
				description: this.description,
				assumptions: this.assumptions,
				objectives: this.objectives,
				constraints: this.constraints,
				measures: this.measures,
				datasets: this.datasets,
				models: this.models,
				notebooks: this.notebooks,
				publications: this.publications,
				collaborators: this.collaborators,
				updated: this.updated
			});

			// console.log(goal);

			// Redirect after save
			goal.$save(function(response) {
				$location.path('goals/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.assumptions = '';
				$scope.objectives = '';
				$scope.constraints = '';
				$scope.measures = '';
				$scope.datasets = '';
				$scope.models = '';
				$scope.notebooks = '';
				$scope.publications = '';
				$scope.collaborators = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Goal
		$scope.remove = function(goal) {
			if ( goal ) {
				goal.$remove();

				for (var i in $scope.goals) {
					if ($scope.goals [i] === goal) {
						$scope.goals.splice(i, 1);
					}
				}
			} else {
				$scope.goal.$remove(function() {
					$location.path('goals');
				});
			}
		};

		// Update existing Goal
		$scope.update = function() {
			var goal = $scope.goal;

			goal.$update(function() {
				$location.path('goals/' + goal._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goals
		$scope.find = function() {
			$scope.goals = Goals.query();
		};

		// Find existing Goal
		$scope.findOne = function() {
			$scope.goal = Goals.get({
				goalId: $stateParams.goalId
			});
		};
	}
]);
'use strict';

//Goals service used to communicate Goals REST endpoints
angular.module('goals').factory('Goals', ['$resource',
	function($resource) {
		return $resource('goals/:goalId', { goalId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Goals Controller Spec
	describe('Goals Controller Tests', function() {
		// Initialize global variables
		var GoalsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Goals controller.
			GoalsController = $controller('GoalsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Goal object fetched from XHR', inject(function(Goals) {
			// Create sample Goal using the Goals service
			var sampleGoal = new Goals({
				name: 'New Goal'
			});

			// Create a sample Goals array that includes the new Goal
			var sampleGoals = [sampleGoal];

			// Set GET response
			$httpBackend.expectGET('goals').respond(sampleGoals);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goals).toEqualData(sampleGoals);
		}));

		it('$scope.findOne() should create an array with one Goal object fetched from XHR using a goalId URL parameter', inject(function(Goals) {
			// Define a sample Goal object
			var sampleGoal = new Goals({
				name: 'New Goal'
			});

			// Set the URL parameter
			$stateParams.goalId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/goals\/([0-9a-fA-F]{24})$/).respond(sampleGoal);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goal).toEqualData(sampleGoal);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Goals) {
			// Create a sample Goal object
			var sampleGoalPostData = new Goals({
				name: 'New Goal'
			});

			// Create a sample Goal response
			var sampleGoalResponse = new Goals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goal'
			});

			// Fixture mock form input values
			scope.name = 'New Goal';

			// Set POST response
			$httpBackend.expectPOST('goals', sampleGoalPostData).respond(sampleGoalResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Goal was created
			expect($location.path()).toBe('/goals/' + sampleGoalResponse._id);
		}));

		it('$scope.update() should update a valid Goal', inject(function(Goals) {
			// Define a sample Goal put data
			var sampleGoalPutData = new Goals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goal'
			});

			// Mock Goal in scope
			scope.goal = sampleGoalPutData;

			// Set PUT response
			$httpBackend.expectPUT(/goals\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/goals/' + sampleGoalPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid goalId and remove the Goal from the scope', inject(function(Goals) {
			// Create new Goal object
			var sampleGoal = new Goals({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Goals array and include the Goal
			scope.goals = [sampleGoal];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/goals\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGoal);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.goals.length).toBe(0);
		}));
	});
}());
'use strict';

// Configuring the Articles module
// Uncomment to include in topbar navigation.
/*
angular.module('models').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Models', 'models', 'dropdown', '/models(/create)?');
		Menus.addSubMenuItem('topbar', 'models', 'List Models', 'models');
		Menus.addSubMenuItem('topbar', 'models', 'New Model', 'models/create');
	}
]);
*/
'use strict';

//Setting up route
angular.module('models').config(['$stateProvider',
	function($stateProvider) {
		// Models state routing
		$stateProvider.
		state('listModels', {
			url: '/models',
			templateUrl: 'modules/models/views/list-models.client.view.html'
		}).
		state('createModel', {
			url: '/models/create',
			templateUrl: 'modules/models/views/create-model.client.view.html'
		}).
		state('viewModel', {
			url: '/models/:modelId',
			templateUrl: 'modules/models/views/view-model.client.view.html'
		}).
		state('editModel', {
			url: '/models/:modelId/edit',
			templateUrl: 'modules/models/views/edit-model.client.view.html'
		});
	}
]);
'use strict';

// Models controller
angular.module('models').controller('ModelsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Models',
	function($scope, $stateParams, $location, Authentication, Models) {
		$scope.authentication = Authentication;

		// Create new Model
		$scope.create = function() {
			// Create new Model object
			var model = new Models ({
				name: this.name
			});

			// Redirect after save
			model.$save(function(response) {
				$location.path('models/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Model
		$scope.remove = function(model) {
			if ( model ) { 
				model.$remove();

				for (var i in $scope.models) {
					if ($scope.models [i] === model) {
						$scope.models.splice(i, 1);
					}
				}
			} else {
				$scope.model.$remove(function() {
					$location.path('models');
				});
			}
		};

		// Update existing Model
		$scope.update = function() {
			var model = $scope.model;

			model.$update(function() {
				$location.path('models/' + model._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Models
		$scope.find = function() {
			$scope.models = Models.query();
		};

		// Find existing Model
		$scope.findOne = function() {
			$scope.model = Models.get({ 
				modelId: $stateParams.modelId
			});
		};
	}
]);
'use strict';

//Models service used to communicate Models REST endpoints
angular.module('models').factory('Models', ['$resource',
	function($resource) {
		return $resource('models/:modelId', { modelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Models Controller Spec
	describe('Models Controller Tests', function() {
		// Initialize global variables
		var ModelsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Models controller.
			ModelsController = $controller('ModelsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Model object fetched from XHR', inject(function(Models) {
			// Create sample Model using the Models service
			var sampleModel = new Models({
				name: 'New Model'
			});

			// Create a sample Models array that includes the new Model
			var sampleModels = [sampleModel];

			// Set GET response
			$httpBackend.expectGET('models').respond(sampleModels);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.models).toEqualData(sampleModels);
		}));

		it('$scope.findOne() should create an array with one Model object fetched from XHR using a modelId URL parameter', inject(function(Models) {
			// Define a sample Model object
			var sampleModel = new Models({
				name: 'New Model'
			});

			// Set the URL parameter
			$stateParams.modelId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/models\/([0-9a-fA-F]{24})$/).respond(sampleModel);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.model).toEqualData(sampleModel);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Models) {
			// Create a sample Model object
			var sampleModelPostData = new Models({
				name: 'New Model'
			});

			// Create a sample Model response
			var sampleModelResponse = new Models({
				_id: '525cf20451979dea2c000001',
				name: 'New Model'
			});

			// Fixture mock form input values
			scope.name = 'New Model';

			// Set POST response
			$httpBackend.expectPOST('models', sampleModelPostData).respond(sampleModelResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Model was created
			expect($location.path()).toBe('/models/' + sampleModelResponse._id);
		}));

		it('$scope.update() should update a valid Model', inject(function(Models) {
			// Define a sample Model put data
			var sampleModelPutData = new Models({
				_id: '525cf20451979dea2c000001',
				name: 'New Model'
			});

			// Mock Model in scope
			scope.model = sampleModelPutData;

			// Set PUT response
			$httpBackend.expectPUT(/models\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/models/' + sampleModelPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid modelId and remove the Model from the scope', inject(function(Models) {
			// Create new Model object
			var sampleModel = new Models({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Models array and include the Model
			scope.models = [sampleModel];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/models\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleModel);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.models.length).toBe(0);
		}));
	});
}());
'use strict';

// Configuring the Articles module
// Uncomment to include in topbar navigation.
/*
angular.module('notebooks').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Notebooks', 'notebooks', 'dropdown', '/notebooks(/create)?');
        Menus.addSubMenuItem('topbar', 'notebooks', 'List Notebooks', 'notebooks');
        Menus.addSubMenuItem('topbar', 'notebooks', 'New Notebooks', 'notebooks/create');
    }
]);
*/
'use strict';

//Setting up route
angular.module('notebooks').config(['$stateProvider',
	function($stateProvider) {
		// Notebooks state routing
		$stateProvider.
		state('listNotebooks', {
			url: '/notebooks',
			templateUrl: 'modules/notebooks/views/list-notebooks.client.view.html'
		}).
		state('createNotebook', {
			url: '/notebooks/create',
			templateUrl: 'modules/notebooks/views/create-notebook.client.view.html'
		}).
		state('viewNotebook', {
			url: '/notebooks/:notebookId',
			templateUrl: 'modules/notebooks/views/view-notebook.client.view.html'
		}).
		state('editNotebook', {
			url: '/notebooks/:notebookId/edit',
			templateUrl: 'modules/notebooks/views/edit-notebook.client.view.html'
		});
	}
]);
'use strict';

// Notebooks controller
angular.module('notebooks').controller('NotebooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notebooks',
	function($scope, $stateParams, $location, Authentication, Notebooks) {
		$scope.authentication = Authentication;

		// Create new Notebook
		$scope.create = function() {
			// Create new Notebook object
			var notebook = new Notebooks ({
				name: this.name
			});

			// Redirect after save
			notebook.$save(function(response) {
				$location.path('notebooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notebook
		$scope.remove = function(notebook) {
			if ( notebook ) { 
				notebook.$remove();

				for (var i in $scope.notebooks) {
					if ($scope.notebooks [i] === notebook) {
						$scope.notebooks.splice(i, 1);
					}
				}
			} else {
				$scope.notebook.$remove(function() {
					$location.path('notebooks');
				});
			}
		};

		// Update existing Notebook
		$scope.update = function() {
			var notebook = $scope.notebook;

			notebook.$update(function() {
				$location.path('notebooks/' + notebook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notebooks
		$scope.find = function() {
			$scope.notebooks = Notebooks.query();
		};

		// Find existing Notebook
		$scope.findOne = function() {
			$scope.notebook = Notebooks.get({ 
				notebookId: $stateParams.notebookId
			});
		};
	}
]);
'use strict';

//Notebooks service used to communicate Notebooks REST endpoints
angular.module('notebooks').factory('Notebooks', ['$resource',
	function($resource) {
		return $resource('notebooks/:notebookId', { notebookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Notebooks Controller Spec
	describe('Notebooks Controller Tests', function() {
		// Initialize global variables
		var NotebooksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Notebooks controller.
			NotebooksController = $controller('NotebooksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Notebook object fetched from XHR', inject(function(Notebooks) {
			// Create sample Notebook using the Notebooks service
			var sampleNotebook = new Notebooks({
				name: 'New Notebook'
			});

			// Create a sample Notebooks array that includes the new Notebook
			var sampleNotebooks = [sampleNotebook];

			// Set GET response
			$httpBackend.expectGET('notebooks').respond(sampleNotebooks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.notebooks).toEqualData(sampleNotebooks);
		}));

		it('$scope.findOne() should create an array with one Notebook object fetched from XHR using a notebookId URL parameter', inject(function(Notebooks) {
			// Define a sample Notebook object
			var sampleNotebook = new Notebooks({
				name: 'New Notebook'
			});

			// Set the URL parameter
			$stateParams.notebookId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/notebooks\/([0-9a-fA-F]{24})$/).respond(sampleNotebook);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.notebook).toEqualData(sampleNotebook);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Notebooks) {
			// Create a sample Notebook object
			var sampleNotebookPostData = new Notebooks({
				name: 'New Notebook'
			});

			// Create a sample Notebook response
			var sampleNotebookResponse = new Notebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Notebook'
			});

			// Fixture mock form input values
			scope.name = 'New Notebook';

			// Set POST response
			$httpBackend.expectPOST('notebooks', sampleNotebookPostData).respond(sampleNotebookResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Notebook was created
			expect($location.path()).toBe('/notebooks/' + sampleNotebookResponse._id);
		}));

		it('$scope.update() should update a valid Notebook', inject(function(Notebooks) {
			// Define a sample Notebook put data
			var sampleNotebookPutData = new Notebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Notebook'
			});

			// Mock Notebook in scope
			scope.notebook = sampleNotebookPutData;

			// Set PUT response
			$httpBackend.expectPUT(/notebooks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/notebooks/' + sampleNotebookPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid notebookId and remove the Notebook from the scope', inject(function(Notebooks) {
			// Create new Notebook object
			var sampleNotebook = new Notebooks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Notebooks array and include the Notebook
			scope.notebooks = [sampleNotebook];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/notebooks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNotebook);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.notebooks.length).toBe(0);
		}));
	});
}());
'use strict';

//Setting up route
angular.module('publications').config(['$stateProvider',
	function($stateProvider) {
		// Publications state routing
		$stateProvider.
		state('listPublications', {
			url: '/publications',
			templateUrl: 'modules/publications/views/list-publications.client.view.html'
		}).
		state('createPublication', {
			url: '/publications/create',
			templateUrl: 'modules/publications/views/create-publication.client.view.html'
		}).
		state('viewPublication', {
			url: '/publications/:publicationId',
			templateUrl: 'modules/publications/views/view-publication.client.view.html'
		}).
		state('editPublication', {
			url: '/publications/:publicationId/edit',
			templateUrl: 'modules/publications/views/edit-publication.client.view.html'
		});
	}
]);
'use strict';

// Publications controller
angular.module('publications').controller('PublicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Publications',
	function($scope, $stateParams, $location, Authentication, Publications) {
		$scope.authentication = Authentication;

		// Create new Publication
		$scope.create = function() {
			// Create new Publication object
			var publication = new Publications ({
				name: this.name
			});

			// Redirect after save
			publication.$save(function(response) {
				$location.path('publications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Publication
		$scope.remove = function(publication) {
			if ( publication ) { 
				publication.$remove();

				for (var i in $scope.publications) {
					if ($scope.publications [i] === publication) {
						$scope.publications.splice(i, 1);
					}
				}
			} else {
				$scope.publication.$remove(function() {
					$location.path('publications');
				});
			}
		};

		// Update existing Publication
		$scope.update = function() {
			var publication = $scope.publication;

			publication.$update(function() {
				$location.path('publications/' + publication._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Publications
		$scope.find = function() {
			$scope.publications = Publications.query();
		};

		// Find existing Publication
		$scope.findOne = function() {
			$scope.publication = Publications.get({ 
				publicationId: $stateParams.publicationId
			});
		};
	}
]);
'use strict';

//Publications service used to communicate Publications REST endpoints
angular.module('publications').factory('Publications', ['$resource',
	function($resource) {
		return $resource('publications/:publicationId', { publicationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Publications Controller Spec
	describe('Publications Controller Tests', function() {
		// Initialize global variables
		var PublicationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Publications controller.
			PublicationsController = $controller('PublicationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Publication object fetched from XHR', inject(function(Publications) {
			// Create sample Publication using the Publications service
			var samplePublication = new Publications({
				name: 'New Publication'
			});

			// Create a sample Publications array that includes the new Publication
			var samplePublications = [samplePublication];

			// Set GET response
			$httpBackend.expectGET('publications').respond(samplePublications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.publications).toEqualData(samplePublications);
		}));

		it('$scope.findOne() should create an array with one Publication object fetched from XHR using a publicationId URL parameter', inject(function(Publications) {
			// Define a sample Publication object
			var samplePublication = new Publications({
				name: 'New Publication'
			});

			// Set the URL parameter
			$stateParams.publicationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/publications\/([0-9a-fA-F]{24})$/).respond(samplePublication);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.publication).toEqualData(samplePublication);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Publications) {
			// Create a sample Publication object
			var samplePublicationPostData = new Publications({
				name: 'New Publication'
			});

			// Create a sample Publication response
			var samplePublicationResponse = new Publications({
				_id: '525cf20451979dea2c000001',
				name: 'New Publication'
			});

			// Fixture mock form input values
			scope.name = 'New Publication';

			// Set POST response
			$httpBackend.expectPOST('publications', samplePublicationPostData).respond(samplePublicationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Publication was created
			expect($location.path()).toBe('/publications/' + samplePublicationResponse._id);
		}));

		it('$scope.update() should update a valid Publication', inject(function(Publications) {
			// Define a sample Publication put data
			var samplePublicationPutData = new Publications({
				_id: '525cf20451979dea2c000001',
				name: 'New Publication'
			});

			// Mock Publication in scope
			scope.publication = samplePublicationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/publications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/publications/' + samplePublicationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid publicationId and remove the Publication from the scope', inject(function(Publications) {
			// Create new Publication object
			var samplePublication = new Publications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Publications array and include the Publication
			scope.publications = [samplePublication];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/publications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePublication);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.publications.length).toBe(0);
		}));
	});
}());
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Authentication controller Spec
	describe('AuthenticationController', function() {
		// Initialize global variables
		var AuthenticationController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Authentication controller
			AuthenticationController = $controller('AuthenticationController', {
				$scope: scope
			});
		}));


		it('$scope.signin() should login with a correct user and password', function() {
			// Test expected GET request
			$httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.authentication.user).toEqual('Fred');
			expect($location.url()).toEqual('/');
		});

		it('$scope.signin() should fail to log in with nothing', function() {
			// Test expected POST request
			$httpBackend.expectPOST('/auth/signin').respond(400, {
				'message': 'Missing credentials'
			});

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Missing credentials');
		});

		it('$scope.signin() should fail to log in with wrong credentials', function() {
			// Foo/Bar combo assumed to not exist
			scope.authentication.user = 'Foo';
			scope.credentials = 'Bar';

			// Test expected POST request
			$httpBackend.expectPOST('/auth/signin').respond(400, {
				'message': 'Unknown user'
			});

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Unknown user');
		});

		it('$scope.signup() should register with correct data', function() {
			// Test expected GET request
			scope.authentication.user = 'Fred';
			$httpBackend.when('POST', '/auth/signup').respond(200, 'Fred');

			scope.signup();
			$httpBackend.flush();

			// test scope value
			expect(scope.authentication.user).toBe('Fred');
			expect(scope.error).toEqual(undefined);
			expect($location.url()).toBe('/');
		});

		it('$scope.signup() should fail to register with duplicate Username', function() {
			// Test expected POST request
			$httpBackend.when('POST', '/auth/signup').respond(400, {
				'message': 'Username already exists'
			});

			scope.signup();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toBe('Username already exists');
		});
	});
}());