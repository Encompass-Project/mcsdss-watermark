'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Decision = mongoose.model('Decision'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, decision;

/**
 * Decision routes tests
 */
describe('Decision CRUD tests', function() {
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

		// Save a user to the test db and create new Decision
		user.save(function() {
			decision = {
				name: 'Decision Name'
			};

			done();
		});
	});

	it('should be able to save Decision instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Decision
				agent.post('/decisions')
					.send(decision)
					.expect(200)
					.end(function(decisionSaveErr, decisionSaveRes) {
						// Handle Decision save error
						if (decisionSaveErr) done(decisionSaveErr);

						// Get a list of Decisions
						agent.get('/decisions')
							.end(function(decisionsGetErr, decisionsGetRes) {
								// Handle Decision save error
								if (decisionsGetErr) done(decisionsGetErr);

								// Get Decisions list
								var decisions = decisionsGetRes.body;

								// Set assertions
								(decisions[0].user._id).should.equal(userId);
								(decisions[0].name).should.match('Decision Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Decision instance if not logged in', function(done) {
		agent.post('/decisions')
			.send(decision)
			.expect(401)
			.end(function(decisionSaveErr, decisionSaveRes) {
				// Call the assertion callback
				done(decisionSaveErr);
			});
	});

	it('should not be able to save Decision instance if no name is provided', function(done) {
		// Invalidate name field
		decision.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Decision
				agent.post('/decisions')
					.send(decision)
					.expect(400)
					.end(function(decisionSaveErr, decisionSaveRes) {
						// Set message assertion
						(decisionSaveRes.body.message).should.match('Please fill Decision name');
						
						// Handle Decision save error
						done(decisionSaveErr);
					});
			});
	});

	it('should be able to update Decision instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Decision
				agent.post('/decisions')
					.send(decision)
					.expect(200)
					.end(function(decisionSaveErr, decisionSaveRes) {
						// Handle Decision save error
						if (decisionSaveErr) done(decisionSaveErr);

						// Update Decision name
						decision.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Decision
						agent.put('/decisions/' + decisionSaveRes.body._id)
							.send(decision)
							.expect(200)
							.end(function(decisionUpdateErr, decisionUpdateRes) {
								// Handle Decision update error
								if (decisionUpdateErr) done(decisionUpdateErr);

								// Set assertions
								(decisionUpdateRes.body._id).should.equal(decisionSaveRes.body._id);
								(decisionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Decisions if not signed in', function(done) {
		// Create new Decision model instance
		var decisionObj = new Decision(decision);

		// Save the Decision
		decisionObj.save(function() {
			// Request Decisions
			request(app).get('/decisions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Decision if not signed in', function(done) {
		// Create new Decision model instance
		var decisionObj = new Decision(decision);

		// Save the Decision
		decisionObj.save(function() {
			request(app).get('/decisions/' + decisionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', decision.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Decision instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Decision
				agent.post('/decisions')
					.send(decision)
					.expect(200)
					.end(function(decisionSaveErr, decisionSaveRes) {
						// Handle Decision save error
						if (decisionSaveErr) done(decisionSaveErr);

						// Delete existing Decision
						agent.delete('/decisions/' + decisionSaveRes.body._id)
							.send(decision)
							.expect(200)
							.end(function(decisionDeleteErr, decisionDeleteRes) {
								// Handle Decision error error
								if (decisionDeleteErr) done(decisionDeleteErr);

								// Set assertions
								(decisionDeleteRes.body._id).should.equal(decisionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Decision instance if not signed in', function(done) {
		// Set Decision user 
		decision.user = user;

		// Create new Decision model instance
		var decisionObj = new Decision(decision);

		// Save the Decision
		decisionObj.save(function() {
			// Try deleting Decision
			request(app).delete('/decisions/' + decisionObj._id)
			.expect(401)
			.end(function(decisionDeleteErr, decisionDeleteRes) {
				// Set message assertion
				(decisionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Decision error error
				done(decisionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Decision.remove().exec();
		done();
	});
});