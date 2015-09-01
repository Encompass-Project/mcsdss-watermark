'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Notebook = mongoose.model('Notebook'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, notebook;

/**
 * Notebook routes tests
 */
describe('Notebook CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Notebook
		user.save(function() {
			notebook = {
				name: 'Notebook Name'
			};

			done();
		});
	});

	it('should be able to save Notebook instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notebook
				agent.post('/notebooks')
					.send(notebook)
					.expect(200)
					.end(function(notebookSaveErr, notebookSaveRes) {
						// Handle Notebook save error
						if (notebookSaveErr) done(notebookSaveErr);

						// Get a list of Notebooks
						agent.get('/notebooks')
							.end(function(notebooksGetErr, notebooksGetRes) {
								// Handle Notebook save error
								if (notebooksGetErr) done(notebooksGetErr);

								// Get Notebooks list
								var notebooks = notebooksGetRes.body;

								// Set assertions
								(notebooks[0].user._id).should.equal(userId);
								(notebooks[0].name).should.match('Notebook Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Notebook instance if not logged in', function(done) {
		agent.post('/notebooks')
			.send(notebook)
			.expect(401)
			.end(function(notebookSaveErr, notebookSaveRes) {
				// Call the assertion callback
				done(notebookSaveErr);
			});
	});

	it('should not be able to save Notebook instance if no name is provided', function(done) {
		// Invalidate name field
		notebook.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notebook
				agent.post('/notebooks')
					.send(notebook)
					.expect(400)
					.end(function(notebookSaveErr, notebookSaveRes) {
						// Set message assertion
						(notebookSaveRes.body.message).should.match('Please fill Notebook name');
						
						// Handle Notebook save error
						done(notebookSaveErr);
					});
			});
	});

	it('should be able to update Notebook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notebook
				agent.post('/notebooks')
					.send(notebook)
					.expect(200)
					.end(function(notebookSaveErr, notebookSaveRes) {
						// Handle Notebook save error
						if (notebookSaveErr) done(notebookSaveErr);

						// Update Notebook name
						notebook.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Notebook
						agent.put('/notebooks/' + notebookSaveRes.body._id)
							.send(notebook)
							.expect(200)
							.end(function(notebookUpdateErr, notebookUpdateRes) {
								// Handle Notebook update error
								if (notebookUpdateErr) done(notebookUpdateErr);

								// Set assertions
								(notebookUpdateRes.body._id).should.equal(notebookSaveRes.body._id);
								(notebookUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Notebooks if not signed in', function(done) {
		// Create new Notebook model instance
		var notebookObj = new Notebook(notebook);

		// Save the Notebook
		notebookObj.save(function() {
			// Request Notebooks
			request(app).get('/notebooks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Notebook if not signed in', function(done) {
		// Create new Notebook model instance
		var notebookObj = new Notebook(notebook);

		// Save the Notebook
		notebookObj.save(function() {
			request(app).get('/notebooks/' + notebookObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', notebook.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Notebook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notebook
				agent.post('/notebooks')
					.send(notebook)
					.expect(200)
					.end(function(notebookSaveErr, notebookSaveRes) {
						// Handle Notebook save error
						if (notebookSaveErr) done(notebookSaveErr);

						// Delete existing Notebook
						agent.delete('/notebooks/' + notebookSaveRes.body._id)
							.send(notebook)
							.expect(200)
							.end(function(notebookDeleteErr, notebookDeleteRes) {
								// Handle Notebook error error
								if (notebookDeleteErr) done(notebookDeleteErr);

								// Set assertions
								(notebookDeleteRes.body._id).should.equal(notebookSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Notebook instance if not signed in', function(done) {
		// Set Notebook user 
		notebook.user = user;

		// Create new Notebook model instance
		var notebookObj = new Notebook(notebook);

		// Save the Notebook
		notebookObj.save(function() {
			// Try deleting Notebook
			request(app).delete('/notebooks/' + notebookObj._id)
			.expect(401)
			.end(function(notebookDeleteErr, notebookDeleteRes) {
				// Set message assertion
				(notebookDeleteRes.body.message).should.match('User is not logged in');

				// Handle Notebook error error
				done(notebookDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Notebook.remove().exec();
		done();
	});
});