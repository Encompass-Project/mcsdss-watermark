'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var notebooks = require('../../app/controllers/notebooks.server.controller');

	// Notebooks Routes
	app.route('/notebooks')
		.get(notebooks.list)
		.post(users.requiresLogin, notebooks.create);

	app.route('/notebooks/:notebookId')
		.get(notebooks.read)
		.put(users.requiresLogin, notebooks.hasAuthorization, notebooks.update)
		.delete(users.requiresLogin, notebooks.hasAuthorization, notebooks.delete);

	// Finish by binding the Notebook middleware
	app.param('notebookId', notebooks.notebookByID);
};
