'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var publications = require('../../app/controllers/publications.server.controller');

	// Publications Routes
	app.route('/publications')
		.get(publications.list)
		.post(users.requiresLogin, publications.create);

	app.route('/publications/:publicationId')
		.get(publications.read)
		.put(users.requiresLogin, publications.hasAuthorization, publications.update)
		.delete(users.requiresLogin, publications.hasAuthorization, publications.delete);

	// Finish by binding the Publication middleware
	app.param('publicationId', publications.publicationByID);
};
