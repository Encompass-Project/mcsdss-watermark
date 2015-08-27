'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var decisions = require('../../app/controllers/decisions.server.controller');

	// Decisions Routes
	app.route('/decisions')
		.get(decisions.list)
		.post(users.requiresLogin, decisions.create);

	app.route('/decisions/:decisionId')
		.get(decisions.read)
		.put(users.requiresLogin, decisions.hasAuthorization, decisions.update)
		.delete(users.requiresLogin, decisions.hasAuthorization, decisions.delete);

	// Finish by binding the Decision middleware
	app.param('decisionId', decisions.decisionByID);
};
