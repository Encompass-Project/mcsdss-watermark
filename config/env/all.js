'use strict';

module.exports = {
	app: {
		title: 'MCSDSS',
		// description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		description: 'A Multi-Criteria Spatial Decision Support System',
		// keywords: 'MongoDB, Express, AngularJS, Node.js'
		keywords: 'Decision Support System, Multi-criteria, Spatial, GIS, Decision Theory, Decision Analysis, AHP, Analytical Hierarchy Process'
	},
	port: process.env.PORT || 9000, //3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			// You can use CDN paths here in the production builds.
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/leaflet/dist/leaflet.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-simple-logger/dist/angular-simple-logger.js',
				'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
				'public/lib/karma-jasmine/lib/jasmine.js',
				// 'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
				// 'public/lib/ng-file-upload/angular-file-upload.min.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/papaparse/papaparse.min.js',
				'public/lib/angular-papaparse/dist/js/angular-PapaParse.js',
				'public/lib/leaflet/dist/leaflet.js',
				'public/lib/d3/d3.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/**/*.js', // Picks up nested controllers within modules.
			'public/modules/*/*[!tests]*/*.js',
			'public/modules/core/directives/leaflet-directive.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};