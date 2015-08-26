'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var geojsons = require('../../app/controllers/geojsons.server.controller');

	// Geojsons Routes
	app.route('/geojsons')
		.get(geojsons.list)
		.post(users.requiresLogin, geojsons.create);

	app.route('/geojsons/:geojsonId')
		.get(geojsons.read)
		.put(users.requiresLogin, geojsons.hasAuthorization, geojsons.update)
		.delete(users.requiresLogin, geojsons.hasAuthorization, geojsons.delete);

	// Finish by binding the Geojson middleware
	app.param('geojsonId', geojsons.geojsonByID);
};
