'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var formulations = require('../../app/controllers/formulations.server.controller');

	// Formulations Routes
	app.route('/formulations')
		.get(formulations.list)
		.post(users.requiresLogin, formulations.create);

	app.route('/formulations/:formulationId')
		.get(formulations.read)
		.put(users.requiresLogin, formulations.hasAuthorization, formulations.update)
		.delete(users.requiresLogin, formulations.hasAuthorization, formulations.delete);

	// Finish by binding the Formulation middleware
	app.param('formulationId', formulations.formulationByID);
};
