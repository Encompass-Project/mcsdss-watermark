'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var data = require('../../app/controllers/data.server.controller');

	// Data Routes
	app.route('/data')
		.get(data.list)
		.post(users.requiresLogin, data.create);

	app.route('/data/:datumId')
		.get(data.read)
		.put(users.requiresLogin, data.hasAuthorization, data.update)
		.delete(users.requiresLogin, data.hasAuthorization, data.delete);

	// Finish by binding the Datum middleware
	app.param('datumId', data.datumByID);
};
