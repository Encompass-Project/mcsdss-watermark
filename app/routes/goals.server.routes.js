'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var goals = require('../../app/controllers/goals.server.controller');

	// Goals Routes
	app.route('/goals')
		.get(goals.list)
		.post(users.requiresLogin, goals.create);

	app.route('/goals/:goalId')
		.get(goals.read)
		.put(users.requiresLogin, goals.hasAuthorization, goals.update)
		.delete(users.requiresLogin, goals.hasAuthorization, goals.delete);

	// Finish by binding the Goal middleware
	app.param('goalId', goals.goalByID);
};
