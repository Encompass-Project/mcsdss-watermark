'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Formulation = mongoose.model('Formulation'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, formulation;

/**
 * Formulation routes tests
 */
describe('Formulation CRUD tests', function() {
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

		// Save a user to the test db and create new Formulation
		user.save(function() {
			formulation = {
				name: 'Formulation Name'
			};

			done();
		});
	});

	it('should be able to save Formulation instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Formulation
				agent.post('/formulations')
					.send(formulation)
					.expect(200)
					.end(function(formulationSaveErr, formulationSaveRes) {
						// Handle Formulation save error
						if (formulationSaveErr) done(formulationSaveErr);

						// Get a list of Formulations
						agent.get('/formulations')
							.end(function(formulationsGetErr, formulationsGetRes) {
								// Handle Formulation save error
								if (formulationsGetErr) done(formulationsGetErr);

								// Get Formulations list
								var formulations = formulationsGetRes.body;

								// Set assertions
								(formulations[0].user._id).should.equal(userId);
								(formulations[0].name).should.match('Formulation Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Formulation instance if not logged in', function(done) {
		agent.post('/formulations')
			.send(formulation)
			.expect(401)
			.end(function(formulationSaveErr, formulationSaveRes) {
				// Call the assertion callback
				done(formulationSaveErr);
			});
	});

	it('should not be able to save Formulation instance if no name is provided', function(done) {
		// Invalidate name field
		formulation.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Formulation
				agent.post('/formulations')
					.send(formulation)
					.expect(400)
					.end(function(formulationSaveErr, formulationSaveRes) {
						// Set message assertion
						(formulationSaveRes.body.message).should.match('Please fill Formulation name');
						
						// Handle Formulation save error
						done(formulationSaveErr);
					});
			});
	});

	it('should be able to update Formulation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Formulation
				agent.post('/formulations')
					.send(formulation)
					.expect(200)
					.end(function(formulationSaveErr, formulationSaveRes) {
						// Handle Formulation save error
						if (formulationSaveErr) done(formulationSaveErr);

						// Update Formulation name
						formulation.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Formulation
						agent.put('/formulations/' + formulationSaveRes.body._id)
							.send(formulation)
							.expect(200)
							.end(function(formulationUpdateErr, formulationUpdateRes) {
								// Handle Formulation update error
								if (formulationUpdateErr) done(formulationUpdateErr);

								// Set assertions
								(formulationUpdateRes.body._id).should.equal(formulationSaveRes.body._id);
								(formulationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Formulations if not signed in', function(done) {
		// Create new Formulation model instance
		var formulationObj = new Formulation(formulation);

		// Save the Formulation
		formulationObj.save(function() {
			// Request Formulations
			request(app).get('/formulations')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Formulation if not signed in', function(done) {
		// Create new Formulation model instance
		var formulationObj = new Formulation(formulation);

		// Save the Formulation
		formulationObj.save(function() {
			request(app).get('/formulations/' + formulationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', formulation.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Formulation instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Formulation
				agent.post('/formulations')
					.send(formulation)
					.expect(200)
					.end(function(formulationSaveErr, formulationSaveRes) {
						// Handle Formulation save error
						if (formulationSaveErr) done(formulationSaveErr);

						// Delete existing Formulation
						agent.delete('/formulations/' + formulationSaveRes.body._id)
							.send(formulation)
							.expect(200)
							.end(function(formulationDeleteErr, formulationDeleteRes) {
								// Handle Formulation error error
								if (formulationDeleteErr) done(formulationDeleteErr);

								// Set assertions
								(formulationDeleteRes.body._id).should.equal(formulationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Formulation instance if not signed in', function(done) {
		// Set Formulation user 
		formulation.user = user;

		// Create new Formulation model instance
		var formulationObj = new Formulation(formulation);

		// Save the Formulation
		formulationObj.save(function() {
			// Try deleting Formulation
			request(app).delete('/formulations/' + formulationObj._id)
			.expect(401)
			.end(function(formulationDeleteErr, formulationDeleteRes) {
				// Set message assertion
				(formulationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Formulation error error
				done(formulationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Formulation.remove().exec();
		done();
	});
});