'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Goal = mongoose.model('Goal'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, goal;

/**
 * Goal routes tests
 */
describe('Goal CRUD tests', function() {
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

		// Save a user to the test db and create new Goal
		user.save(function() {
			goal = {
				name: 'Goal Name'
			};

			done();
		});
	});

	it('should be able to save Goal instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goal
				agent.post('/goals')
					.send(goal)
					.expect(200)
					.end(function(goalSaveErr, goalSaveRes) {
						// Handle Goal save error
						if (goalSaveErr) done(goalSaveErr);

						// Get a list of Goals
						agent.get('/goals')
							.end(function(goalsGetErr, goalsGetRes) {
								// Handle Goal save error
								if (goalsGetErr) done(goalsGetErr);

								// Get Goals list
								var goals = goalsGetRes.body;

								// Set assertions
								(goals[0].user._id).should.equal(userId);
								(goals[0].name).should.match('Goal Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Goal instance if not logged in', function(done) {
		agent.post('/goals')
			.send(goal)
			.expect(401)
			.end(function(goalSaveErr, goalSaveRes) {
				// Call the assertion callback
				done(goalSaveErr);
			});
	});

	it('should not be able to save Goal instance if no name is provided', function(done) {
		// Invalidate name field
		goal.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goal
				agent.post('/goals')
					.send(goal)
					.expect(400)
					.end(function(goalSaveErr, goalSaveRes) {
						// Set message assertion
						(goalSaveRes.body.message).should.match('Please fill Goal name');
						
						// Handle Goal save error
						done(goalSaveErr);
					});
			});
	});

	it('should be able to update Goal instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goal
				agent.post('/goals')
					.send(goal)
					.expect(200)
					.end(function(goalSaveErr, goalSaveRes) {
						// Handle Goal save error
						if (goalSaveErr) done(goalSaveErr);

						// Update Goal name
						goal.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Goal
						agent.put('/goals/' + goalSaveRes.body._id)
							.send(goal)
							.expect(200)
							.end(function(goalUpdateErr, goalUpdateRes) {
								// Handle Goal update error
								if (goalUpdateErr) done(goalUpdateErr);

								// Set assertions
								(goalUpdateRes.body._id).should.equal(goalSaveRes.body._id);
								(goalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Goals if not signed in', function(done) {
		// Create new Goal model instance
		var goalObj = new Goal(goal);

		// Save the Goal
		goalObj.save(function() {
			// Request Goals
			request(app).get('/goals')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Goal if not signed in', function(done) {
		// Create new Goal model instance
		var goalObj = new Goal(goal);

		// Save the Goal
		goalObj.save(function() {
			request(app).get('/goals/' + goalObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', goal.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Goal instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goal
				agent.post('/goals')
					.send(goal)
					.expect(200)
					.end(function(goalSaveErr, goalSaveRes) {
						// Handle Goal save error
						if (goalSaveErr) done(goalSaveErr);

						// Delete existing Goal
						agent.delete('/goals/' + goalSaveRes.body._id)
							.send(goal)
							.expect(200)
							.end(function(goalDeleteErr, goalDeleteRes) {
								// Handle Goal error error
								if (goalDeleteErr) done(goalDeleteErr);

								// Set assertions
								(goalDeleteRes.body._id).should.equal(goalSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Goal instance if not signed in', function(done) {
		// Set Goal user 
		goal.user = user;

		// Create new Goal model instance
		var goalObj = new Goal(goal);

		// Save the Goal
		goalObj.save(function() {
			// Try deleting Goal
			request(app).delete('/goals/' + goalObj._id)
			.expect(401)
			.end(function(goalDeleteErr, goalDeleteRes) {
				// Set message assertion
				(goalDeleteRes.body.message).should.match('User is not logged in');

				// Handle Goal error error
				done(goalDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Goal.remove().exec();
		done();
	});
});