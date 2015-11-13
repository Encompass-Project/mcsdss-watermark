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
				'public/lib/components-font-awesome/css/font-awesome.min.css',
				'public/lib/leaflet/dist/leaflet.css',
				'public/lib/ng-table/dist/ng-table.min.css',
				'public/lib/bootstrap-slider/slider.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/jquery-ui/jquery-ui.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				// 'public/lib/angular-bootstrap/ui-bootstrap-tpls-0.14.3.min.js',
				'public/lib/angular-simple-logger/dist/angular-simple-logger.js',
				'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
				// 'public/lib/ng-file-upload-shim/angular-file-upload-shim.min.js',
				// 'public/lib/ng-file-upload/angular-file-upload.min.js',
				'public/lib/papaparse/papaparse.min.js',
				'public/lib/angular-papaparse/dist/js/angular-PapaParse.js',
				'public/lib/leaflet/dist/leaflet.js',
				'public/lib/d3/d3.min.js',
				'public/lib/ng-table/dist/ng-table.js',
				'public/lib/bootstrap/dist/js/bootstrap.min.js',
				'public/lib/bootstrap-slider/bootstrap-slider.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			// 'public/modules/**/*.js', // Picks up nested tests within modules and throws a describe error in dev mode.
			'public/modules/*/*[!tests]*/*.js',
			'public/modules/core/directives/leaflet-directive.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/lib/mongoose/bin/mongoose.js',
			'public/lib/karma/lib/karma.js',
			'public/lib/karma-jasmine/lib/jasmine.js',
			'public/lib/mocha/mocha.js',
			'public/modules/*/tests/*.js'
		]
	}
};