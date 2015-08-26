'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Geojson = mongoose.model('Geojson'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, geojson;

/**
 * Geojson routes tests
 */
describe('Geojson CRUD tests', function() {
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

		// Save a user to the test db and create new Geojson
		user.save(function() {
			geojson = {
				name: 'Geojson Name'
			};

			done();
		});
	});

	it('should be able to save Geojson instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Geojson
				agent.post('/geojsons')
					.send(geojson)
					.expect(200)
					.end(function(geojsonSaveErr, geojsonSaveRes) {
						// Handle Geojson save error
						if (geojsonSaveErr) done(geojsonSaveErr);

						// Get a list of Geojsons
						agent.get('/geojsons')
							.end(function(geojsonsGetErr, geojsonsGetRes) {
								// Handle Geojson save error
								if (geojsonsGetErr) done(geojsonsGetErr);

								// Get Geojsons list
								var geojsons = geojsonsGetRes.body;

								// Set assertions
								(geojsons[0].user._id).should.equal(userId);
								(geojsons[0].name).should.match('Geojson Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Geojson instance if not logged in', function(done) {
		agent.post('/geojsons')
			.send(geojson)
			.expect(401)
			.end(function(geojsonSaveErr, geojsonSaveRes) {
				// Call the assertion callback
				done(geojsonSaveErr);
			});
	});

	it('should not be able to save Geojson instance if no name is provided', function(done) {
		// Invalidate name field
		geojson.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Geojson
				agent.post('/geojsons')
					.send(geojson)
					.expect(400)
					.end(function(geojsonSaveErr, geojsonSaveRes) {
						// Set message assertion
						(geojsonSaveRes.body.message).should.match('Please fill Geojson name');
						
						// Handle Geojson save error
						done(geojsonSaveErr);
					});
			});
	});

	it('should be able to update Geojson instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Geojson
				agent.post('/geojsons')
					.send(geojson)
					.expect(200)
					.end(function(geojsonSaveErr, geojsonSaveRes) {
						// Handle Geojson save error
						if (geojsonSaveErr) done(geojsonSaveErr);

						// Update Geojson name
						geojson.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Geojson
						agent.put('/geojsons/' + geojsonSaveRes.body._id)
							.send(geojson)
							.expect(200)
							.end(function(geojsonUpdateErr, geojsonUpdateRes) {
								// Handle Geojson update error
								if (geojsonUpdateErr) done(geojsonUpdateErr);

								// Set assertions
								(geojsonUpdateRes.body._id).should.equal(geojsonSaveRes.body._id);
								(geojsonUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Geojsons if not signed in', function(done) {
		// Create new Geojson model instance
		var geojsonObj = new Geojson(geojson);

		// Save the Geojson
		geojsonObj.save(function() {
			// Request Geojsons
			request(app).get('/geojsons')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Geojson if not signed in', function(done) {
		// Create new Geojson model instance
		var geojsonObj = new Geojson(geojson);

		// Save the Geojson
		geojsonObj.save(function() {
			request(app).get('/geojsons/' + geojsonObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', geojson.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Geojson instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Geojson
				agent.post('/geojsons')
					.send(geojson)
					.expect(200)
					.end(function(geojsonSaveErr, geojsonSaveRes) {
						// Handle Geojson save error
						if (geojsonSaveErr) done(geojsonSaveErr);

						// Delete existing Geojson
						agent.delete('/geojsons/' + geojsonSaveRes.body._id)
							.send(geojson)
							.expect(200)
							.end(function(geojsonDeleteErr, geojsonDeleteRes) {
								// Handle Geojson error error
								if (geojsonDeleteErr) done(geojsonDeleteErr);

								// Set assertions
								(geojsonDeleteRes.body._id).should.equal(geojsonSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Geojson instance if not signed in', function(done) {
		// Set Geojson user 
		geojson.user = user;

		// Create new Geojson model instance
		var geojsonObj = new Geojson(geojson);

		// Save the Geojson
		geojsonObj.save(function() {
			// Try deleting Geojson
			request(app).delete('/geojsons/' + geojsonObj._id)
			.expect(401)
			.end(function(geojsonDeleteErr, geojsonDeleteRes) {
				// Set message assertion
				(geojsonDeleteRes.body.message).should.match('User is not logged in');

				// Handle Geojson error error
				done(geojsonDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Geojson.remove().exec();
		done();
	});
});