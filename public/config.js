'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mcsdss';
	var applicationModuleDependenciesCustom = ['mcsdss.directives', 'mcsdss.providers'];
	var applicationModuleDependenciesVendor = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'nemLogging', 'ngPapaParse', 'ngTable', 'angularFileUpload']; /* 'leaflet-directive', 'ngFileUpload' */
	var applicationModuleDependencies = applicationModuleDependenciesVendor.concat(applicationModuleDependenciesCustom);
	// console.log(applicationModuleDependencies);

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleDependencies: applicationModuleDependencies,
		registerModule: registerModule
	};
})();