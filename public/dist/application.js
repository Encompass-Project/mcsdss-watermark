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

angular.module('core').controller('DashboardSidebarController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.displayName = $scope.authentication.user.displayName;

        $scope.selectedTemplate = {
            'path':'modules/core/views/client.dashboard.view.html'
        };
    }
]);
'use strict';

angular.module('core').controller('DashboardViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.dashboard.view.html';
    }
]);
'use strict';

angular.module('core').controller('DatasetsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.datasets.view.html';
    }
]);
'use strict';

angular.module('core').controller('DecisionsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.decisions.view.html';
    }
]);
'use strict';

angular.module('core').controller('DefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.default.view.html';
    }
]);
'use strict';

angular.module('core').controller('GoalsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.goals.view.html';
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
            'path':'modules/core/views/client.default.view.html'
        };

        $scope.userTemplate = {
            'path':'modules/core/views/client.user.view.html'
        };
	}
]);
'use strict';

angular.module('core').controller('ModelsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.models.view.html';
    }
]);
'use strict';

angular.module('core').controller('NotebooksViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.notebooks.view.html';
    }
]);
'use strict';

angular.module('core').controller('PublicationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'client.publications.view.html';
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