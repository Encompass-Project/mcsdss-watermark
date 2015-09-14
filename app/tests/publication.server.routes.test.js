'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Publication = mongoose.model('Publication'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, publication;

/**
 * Publication routes tests
 */
describe('Publication CRUD tests', function() {
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

		// Save a user to the test db and create new Publication
		user.save(function() {
			publication = {
				name: 'Publication Name'
			};

			done();
		});
	});

	it('should be able to save Publication instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Publication
				agent.post('/publications')
					.send(publication)
					.expect(200)
					.end(function(publicationSaveErr, publicationSaveRes) {
						// Handle Publication save error
						if (publicationSaveErr) done(publicationSaveErr);

						// Get a list of Publications
						agent.get('/publications')
							.end(function(publicationsGetErr, publicationsGetRes) {
								// Handle Publication save error
								if (publicationsGetErr) done(publicationsGetErr);

								// Get Publications list
								var publications = publicationsGetRes.body;

								// Set assertions
								(publications[0].user._id).should.equal(userId);
								(publications[0].name).should.match('Publication Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Publication instance if not logged in', function(done) {
		agent.post('/publications')
			.send(publication)
			.expect(401)
			.end(function(publicationSaveErr, publicationSaveRes) {
				// Call the assertion callback
				done(publicationSaveErr);
			});
	});

	it('should not be able to save Publication instance if no name is provided', function(done) {
		// Invalidate name field
		publication.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Publication
				agent.post('/publications')
					.send(publication)
					.expect(400)
					.end(function(publicationSaveErr, publicationSaveRes) {
						// Set message assertion
						(publicationSaveRes.body.message).should.match('Please fill Publication name');
						
						// Handle Publication save error
						done(publicationSaveErr);
					});
			});
	});

	it('should be able to update Publication instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Publication
				agent.post('/publications')
					.send(publication)
					.expect(200)
					.end(function(publicationSaveErr, publicationSaveRes) {
						// Handle Publication save error
						if (publicationSaveErr) done(publicationSaveErr);

						// Update Publication name
						publication.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Publication
						agent.put('/publications/' + publicationSaveRes.body._id)
							.send(publication)
							.expect(200)
							.end(function(publicationUpdateErr, publicationUpdateRes) {
								// Handle Publication update error
								if (publicationUpdateErr) done(publicationUpdateErr);

								// Set assertions
								(publicationUpdateRes.body._id).should.equal(publicationSaveRes.body._id);
								(publicationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Publications if not signed in', function(done) {
		// Create new Publication model instance
		var publicationObj = new Publication(publication);

		// Save the Publication
		publicationObj.save(function() {
			// Request Publications
			request(app).get('/publications')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Publication if not signed in', function(done) {
		// Create new Publication model instance
		var publicationObj = new Publication(publication);

		// Save the Publication
		publicationObj.save(function() {
			request(app).get('/publications/' + publicationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', publication.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Publication instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Publication
				agent.post('/publications')
					.send(publication)
					.expect(200)
					.end(function(publicationSaveErr, publicationSaveRes) {
						// Handle Publication save error
						if (publicationSaveErr) done(publicationSaveErr);

						// Delete existing Publication
						agent.delete('/publications/' + publicationSaveRes.body._id)
							.send(publication)
							.expect(200)
							.end(function(publicationDeleteErr, publicationDeleteRes) {
								// Handle Publication error error
								if (publicationDeleteErr) done(publicationDeleteErr);

								// Set assertions
								(publicationDeleteRes.body._id).should.equal(publicationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Publication instance if not signed in', function(done) {
		// Set Publication user 
		publication.user = user;

		// Create new Publication model instance
		var publicationObj = new Publication(publication);

		// Save the Publication
		publicationObj.save(function() {
			// Try deleting Publication
			request(app).delete('/publications/' + publicationObj._id)
			.expect(401)
			.end(function(publicationDeleteErr, publicationDeleteRes) {
				// Set message assertion
				(publicationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Publication error error
				done(publicationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Publication.remove().exec();
		done();
	});
});